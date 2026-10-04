const axios = require("axios");

/**
 * Controller to generate custom tech roadmaps using Google Gemini / Groq with intelligent fallback
 */
exports.generateAiRoadmap = async (req, res) => {
  const {
    topic = "Spring Boot",
    currentLevel = "Beginner",
    goal = "Build real projects and prepare for interviews",
    timePerDay = "1 hour",
    durationDays = 21,
  } = req.body;

  const daysCount = Math.min(Math.max(parseInt(durationDays, 10) || 21, 3), 60);
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const groqApiKey = process.env.GROQ_API_KEY;

  const systemPrompt = `You are a world-class principal software engineer and technical curriculum architect (inspired by high-standard platforms like Chai Prep and roadmap.sh). Create an authoritative, highly specific, realistic day-by-day learning roadmap for:
Topic: "${topic}"
Current Skill Level: "${currentLevel}"
Goal: "${goal}"
Daily Time Commitment: "${timePerDay}"
Total Duration: ${daysCount} days

CRITICAL QUALITY RULES:
1. Exactly ${daysCount} days must be provided in sequential order from day 1 to day ${daysCount}.
2. Group the syllabus into 3 to 5 thematic sprints/modules (e.g. for Spring Boot: "Dependency Injection & IoC", "REST APIs & Exception Handling", "Spring Data JPA & Persistence", "Security & Authentication", "Production Readiness & Deployment").
3. For EACH day, provide REAL, HIGHLY SPECIFIC, DOMAIN-AUTHENTIC concepts and hands-on coding tasks.
   - Mention exact annotations, classes, CLI commands, APIs, and design patterns (e.g. for Spring Boot: @Component, @Service, @Autowired, @RestController, @PathVariable, @ExceptionHandler, @Entity, @Transactional, SecurityFilterChain, @Test).
   - NEVER write vague repetitive placeholders like "Mastering ${topic} fundamental concepts for Day X".
4. Output MUST be ONLY valid JSON with no markdown formatting, no backticks, no extra text.

JSON Schema:
{
  "title": "${topic} Engineering Roadmap",
  "topic": "${topic}",
  "level": "${currentLevel}",
  "totalDays": ${daysCount},
  "dailyCommitment": "${timePerDay}",
  "summary": "Concise 2-sentence description of what the learner will master.",
  "sprints": [
    {
      "name": "Sprint 1: Architecture & Foundations",
      "daysRange": "Days 1-5",
      "summary": "Master core architectural principles and initial environment configuration."
    }
  ],
  "days": [
    {
      "day": 1,
      "sprintName": "Sprint 1: Architecture & Foundations",
      "title": "Concise Specific Topic Title",
      "concepts": [
        "Concrete concept 1 with real API / terminology",
        "Concrete concept 2 with real API / terminology",
        "Concrete concept 3 with real API / terminology"
      ],
      "task": "Specific actionable exercise, code snippet, or miniature project to build today",
      "resourceQuery": "${topic} concise search query for YouTube video walkthrough"
    }
  ]
}`;

  // 1. Try Gemini with high-throughput modern models
  if (geminiApiKey) {
    const geminiModels = [
      "gemini-3.5-flash-lite",
      "gemini-3.8-flash",
      "gemini-3.5-flash",
      "gemini-flash-lite-latest",
      "gemini-flash-latest",
    ];

    for (const model of geminiModels) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
        const response = await axios.post(
          geminiUrl,
          {
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 8192,
              responseMimeType: "application/json",
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": geminiApiKey,
            },
            timeout: 35000,
          }
        );

        const candidateText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          const parsed = parseRoadmapJson(candidateText);
          if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
            return res.status(200).json({
              success: true,
              provider: `gemini-${model}`,
              data: parsed,
            });
          }
        }
      } catch (err) {
        console.warn(`[Gemini ${model} failed]:`, err?.response?.data?.error?.message || err.message);
      }
    }
  }

  // 2. Try Groq Free API fallback if configured
  if (groqApiKey) {
    try {
      const groqResponse = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are an expert technical curriculum designer. Output ONLY valid JSON matching the requested schema with no commentary.",
            },
            {
              role: "user",
              content: systemPrompt,
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
          max_tokens: 8000,
        },
        {
          headers: {
            Authorization: `Bearer ${groqApiKey}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      const groqText = groqResponse.data?.choices?.[0]?.message?.content;
      if (groqText) {
        const parsed = parseRoadmapJson(groqText);
        if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
          return res.status(200).json({
            success: true,
            provider: "groq-llama-3.3-70b",
            data: parsed,
          });
        }
      }
    } catch (groqErr) {
      console.warn("[Groq API failed]:", groqErr?.response?.data?.error?.message || groqErr.message);
    }
  }

  // 3. High-Fidelity Domain-Aware Procedural Fallback Engine
  console.log(`[Roadmap] Using intelligent domain fallback for: "${topic}"`);
  const proceduralData = generateDomainAwareRoadmap({
    topic,
    currentLevel,
    goal,
    timePerDay,
    durationDays: daysCount,
  });

  return res.status(200).json({
    success: true,
    fallback: true,
    data: proceduralData,
  });
};

/**
 * Safely parse JSON text from AI response
 */
function parseRoadmapJson(text) {
  try {
    const cleaned = text
      .replace(/^```json/im, "")
      .replace(/^```/im, "")
      .replace(/```$/im, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (e) {
    const firstBracket = text.indexOf("{");
    const lastBracket = text.lastIndexOf("}");
    if (firstBracket !== -1 && lastBracket !== -1) {
      return JSON.parse(text.substring(firstBracket, lastBracket + 1));
    }
    throw e;
  }
}

/**
 * Domain-Aware Knowledge Maps for Popular Stacks
 */
const DOMAIN_CURRICULUM_BLUEPRINTS = {
  "spring boot": {
    title: "Spring Boot Engineering Roadmap",
    summary: "Master framework architecture, data persistence, and security to clear technical interviews.",
    sprints: [
      { name: "Dependency Injection & IoC", summary: "Master the IoC container, bean scopes, and dependency management." },
      { name: "REST APIs & Exception Handling", summary: "Build production RESTful services, serialization, and global error handling." },
      { name: "Data Persistence with JPA", summary: "Entity mapping, Spring Data repositories, transactions, and performance." },
      { name: "Spring Security & Authentication", summary: "Implement JWT stateless authentication, authorization filters, and password hashing." },
      { name: "Production Readiness & Microservices", summary: "Health checks, Actuator metrics, Docker containers, and cloud deployment." },
    ],
    topics: [
      {
        title: "Inversion of Control & Spring Containers",
        concepts: ["IoC principle and ApplicationContext vs BeanFactory", "Spring Bean lifecycle hooks (@PostConstruct, @PreDestroy)", "Constructor injection vs Field injection best practices"],
        task: "Bootstrap a project using start.spring.io with Spring Web and inject services using constructor injection.",
        query: "Spring Boot IoC container and Dependency Injection tutorial",
      },
      {
        title: "Component Scanning & Stereotype Annotations",
        concepts: ["@Component, @Service, @Repository, and @Controller stereotypes", "Package scanning rules and @ComponentScan mechanics", "Creating custom beans using @Configuration and @Bean"],
        task: "Create a custom @Configuration class to configure and instantiate a third-party client bean.",
        query: "Spring Boot @Configuration and @Bean tutorial",
      },
      {
        title: "Spring Profiles & Configuration Properties",
        concepts: ["application.properties vs application.yml hierarchies", "Managing multi-environment configurations with @Profile", "Type-safe configurations with @ConfigurationProperties"],
        task: "Define separate dev and prod YAML profiles with custom database and logging configurations.",
        query: "Spring Boot profiles and ConfigurationProperties guide",
      },
      {
        title: "RESTful Endpoints & Request Mapping",
        concepts: ["@RestController and @RequestMapping request lifecycles", "@GetMapping, @PostMapping, @PutMapping, @DeleteMapping", "@PathVariable vs @RequestParam query parsing"],
        task: "Implement a CRUD controller for a resource with full REST convention path parameters and status codes.",
        query: "Spring Boot RestController CRUD endpoints tutorial",
      },
      {
        title: "DTO Pattern & Request Validation",
        concepts: ["Separating Data Transfer Objects (DTO) from domain models", "Hibernate Validator with @Valid, @NotNull, @Size, @Email", "BindingResult and structured validation feedback"],
        task: "Create request DTOs with validation rules and reject invalid payloads with proper HTTP 400 status.",
        query: "Spring Boot DTO validation @Valid tutorial",
      },
      {
        title: "Centralized Global Exception Handling",
        concepts: ["@ControllerAdvice and @RestControllerAdvice mechanics", "@ExceptionHandler for mapping exceptions to HTTP error codes", "RFC 7807 Problem Details for standardized error payloads"],
        task: "Write a global exception handler catching ResourceNotFoundException and MethodArgumentNotValidException.",
        query: "Spring Boot @ControllerAdvice global exception handler",
      },
      {
        title: "Database Connectivity & Spring Data JPA",
        concepts: ["Configuring HikariCP connection pool with PostgreSQL/MySQL", "JPA entity mapping with @Entity, @Table, @Id, @GeneratedValue", "DDL auto settings: update vs validate vs create-drop"],
        task: "Connect Spring Boot to a local database and define an Entity with primary key generation and column constraints.",
        query: "Spring Boot JPA PostgreSQL connection tutorial",
      },
      {
        title: "JPA Repositories & Derived Query Methods",
        concepts: ["CrudRepository vs JpaRepository feature sets", "Writing derived queries: findByEmail, findByStatusOrderByCreatedAt", "Pagination and Sorting with Pageable and Sort objects"],
        task: "Implement a JpaRepository with derived queries and paginated list endpoints returning Page<T>.",
        query: "Spring Boot JpaRepository pagination and sorting",
      },
      {
        title: "Entity Relationships & Lazy Loading",
        concepts: ["@OneToMany, @ManyToOne, @ManyToMany mapping rules", "FetchType.LAZY vs FetchType.EAGER and the N+1 select problem", "@JoinColumn and bidirectional cascading behavior"],
        task: "Model a Parent-Child relationship with @OneToMany and write a JOIN FETCH query to prevent N+1 issues.",
        query: "Spring Boot JPA OneToMany relationships and N+1 problem",
      },
      {
        title: "Transactions & Custom JPQL Queries",
        concepts: ["Declarative transactions with @Transactional", "Transaction propagation levels (REQUIRED, REQUIRES_NEW)", "Writing custom JPQL and Native SQL queries with @Query"],
        task: "Create a transactional service method updating multiple database entities atomically.",
        query: "Spring Boot @Transactional propagation and JPQL query",
      },
      {
        title: "Spring Security Architecture & Filters",
        concepts: ["SecurityFilterChain architecture and DelegatingFilterProxy", "Configuring public endpoints vs authenticated routes", "BCryptPasswordEncoder for secure password storage"],
        task: "Configure SecurityFilterChain to permit /api/auth/** while securing all remaining API routes.",
        query: "Spring Security 6 SecurityFilterChain configuration tutorial",
      },
      {
        title: "JWT Authentication & Stateless Tokens",
        concepts: ["JWT token structure: Header, Payload, Signature", "Generating access tokens and refresh tokens with jjwt", "Custom OncePerRequestFilter for header verification"],
        task: "Implement JWT generation on login and create a custom filter checking the Authorization Bearer header.",
        query: "Spring Boot JWT authentication filter tutorial",
      },
      {
        title: "Role-Based Access Control (RBAC)",
        concepts: ["GrantedAuthority and SimpleGrantedAuthority", "Enabling method security with @PreAuthorize(\"hasRole('ADMIN')\")", "Handling 401 Unauthorized vs 403 Forbidden responses"],
        task: "Protect admin routes using @PreAuthorize and test authorization flows with regular and admin users.",
        query: "Spring Boot role based access control @PreAuthorize",
      },
      {
        title: "Unit Testing with JUnit 5 & Mockito",
        concepts: ["Unit test philosophy: isolating business logic", "@ExtendWith(MockitoExtension.class) and @Mock vs @InjectMocks", "Mocking method calls with when().thenReturn() and verify()"],
        task: "Write unit tests for a service class verifying behavior and edge cases with mocked repositories.",
        query: "Spring Boot JUnit 5 Mockito unit testing tutorial",
      },
      {
        title: "Integration Testing with @SpringBootTest",
        concepts: ["@SpringBootTest and @AutoConfigureMockMvc", "Simulating HTTP requests with MockMvc and asserting JSON paths", "Using H2 in-memory database or Testcontainers for integration tests"],
        task: "Write integration tests that invoke controller endpoints and assert response codes and JSON bodies.",
        query: "Spring Boot MockMvc integration test tutorial",
      },
      {
        title: "Spring Boot Actuator & Observability",
        concepts: ["Enabling /actuator/health, /actuator/metrics, and /actuator/info", "Custom health indicators with HealthIndicator", "Prometheus metrics export for monitoring dashboards"],
        task: "Add spring-boot-starter-actuator and implement a custom database health check indicator.",
        query: "Spring Boot Actuator metrics and health endpoints",
      },
      {
        title: "API Documentation with OpenAPI 3 / Swagger",
        concepts: ["Integrating springdoc-openapi-starter-webmvc-ui", "Documenting parameters, responses, and schemas with annotations", "Accessing Swagger UI interactive documentation in browser"],
        task: "Add Swagger UI to your project and annotate endpoints with descriptive summaries and error responses.",
        query: "Spring Boot OpenAPI Swagger 3 integration tutorial",
      },
      {
        title: "Dockerizing Spring Boot Applications",
        concepts: ["Multi-stage Dockerfile builds for optimized image size", "Layered JAR extraction (jarmode=layertools)", "Docker Compose for running Spring Boot + PostgreSQL together"],
        task: "Write a multi-stage Dockerfile and a docker-compose.yml file to run your app with a database.",
        query: "Dockerize Spring Boot multi stage build and docker compose",
      },
      {
        title: "Asynchronous Tasks & Event Listeners",
        concepts: ["@EnableAsync and @Async execution models", "Custom ThreadPoolTaskExecutor thread pool configuration", "ApplicationEventPublisher and @EventListener decoupling"],
        task: "Configure asynchronous email or notification dispatching using @Async with custom thread executors.",
        query: "Spring Boot @Async and ApplicationEventPublisher guide",
      },
      {
        title: "Caching with Redis / Spring Cache",
        concepts: ["@EnableCaching and CacheManager abstractions", "@Cacheable, @CachePut, and @CacheEvict mechanics", "Integrating Redis for distributed cache storage"],
        task: "Cache frequent database query results using Redis and configure cache eviction on update.",
        query: "Spring Boot Redis caching @Cacheable tutorial",
      },
      {
        title: "Production Deployment & Interview Preparation",
        concepts: ["CI/CD pipelines with GitHub Actions", "Environment variables, secrets management, and graceful shutdown", "Top Spring Boot interview questions: IoC, Bean lifecycle, JPA caching, Security"],
        task: "Package application into production executable JAR, verify memory consumption, and review interview flashcards.",
        query: "Spring Boot production deployment and interview questions",
      },
    ],
  },
};

/**
 * Procedural Fallback Engine
 */
function generateDomainAwareRoadmap({ topic = "Fullstack", currentLevel = "Beginner", goal = "Mastery", timePerDay = "1 hour", durationDays = 21 }) {
  const normTopic = topic.toLowerCase().trim();
  const matchedKey = Object.keys(DOMAIN_CURRICULUM_BLUEPRINTS).find((k) => normTopic.includes(k));

  if (matchedKey) {
    const bp = DOMAIN_CURRICULUM_BLUEPRINTS[matchedKey];
    const totalDays = Math.min(durationDays, bp.topics.length);
    const sprintCount = bp.sprints.length;
    const daysPerSprint = Math.ceil(totalDays / sprintCount);

    const days = [];
    for (let i = 0; i < totalDays; i++) {
      const sprintIdx = Math.min(Math.floor(i / daysPerSprint), sprintCount - 1);
      const sprint = bp.sprints[sprintIdx];
      const t = bp.topics[i];

      days.push({
        day: i + 1,
        sprintName: sprint.name,
        title: t.title,
        concepts: t.concepts,
        task: t.task,
        resourceQuery: t.query,
      });
    }

    return {
      title: bp.title,
      topic,
      level: currentLevel,
      totalDays,
      dailyCommitment: timePerDay,
      summary: bp.summary,
      sprints: bp.sprints,
      days,
    };
  }

  // Generalized High-Quality Tech Generator
  const phases = [
    {
      name: "Architecture & Foundations",
      summary: `Master the fundamental syntax, project structure, and environment setup for ${topic}.`,
      tasks: [
        { title: `${topic} Environment, Tooling & Core Architecture`, sub: ["Runtime environment & package manager setup", "Project directory conventions & configuration files", "Compilation / execution workflow"] },
        { title: `Language Primitives & Core Syntax Patterns`, sub: ["Data structures & fundamental data types", "Control flow, error states, and function semantics", "Code modularization and import/export patterns"] },
        { title: `Component & Object Modeling`, sub: ["Object-oriented / functional design paradigms", "State representation and lifecycle management", "Dependency composition vs inheritance"] },
        { title: `Configuration & Environment Management`, sub: ["Environment variables & secrets handling", "Build tools, bundlers, and scripts", "Development mode vs production builds"] },
      ],
    },
    {
      name: "Core Development & Practical Patterns",
      summary: `Build real functional modules and master essential design patterns in ${topic}.`,
      tasks: [
        { title: `Data Handling & Serialization`, sub: ["Parsing JSON/structured payloads", "Data validation, schemas, and error boundaries", "Type safety and interface contracts"] },
        { title: `API & Network Communication`, sub: ["Consuming / exposing HTTP REST endpoints", "Query parameters, headers, and request lifecycle", "Asynchronous operations and non-blocking I/O"] },
        { title: `Database & Storage Persistence`, sub: ["Data storage adapters and connection pooling", "CRUD operations and transaction management", "Query optimization and index design"] },
        { title: `State Management & Business Logic`, sub: ["Centralized state stores vs localized state", "Domain-driven service layer architecture", "Handling complex business workflows"] },
      ],
    },
    {
      name: "Security, Testing & Production Readiness",
      summary: `Harden security, write automated tests, and prepare ${topic} applications for deployment.`,
      tasks: [
        { title: `Authentication, Authorization & Security`, sub: ["Stateless tokens vs session authentication", "Input sanitization and OWASP vulnerabilities", "Role-based authorization checks"] },
        { title: `Automated Testing & Quality Assurance`, sub: ["Unit testing core domain services", "Integration testing API endpoints", "Mocking third-party network dependencies"] },
        { title: `Observability, Logging & Error Handling`, sub: ["Structured JSON logging and telemetry", "Centralized error capture and notification", "Health check probes and performance monitoring"] },
        { title: `Containerization & Production Deployment`, sub: ["Writing clean, minimal Dockerfiles", "CI/CD automated pipeline automation", "Production monitoring and cloud deployment"] },
      ],
    },
  ];

  const days = [];
  const allSubtasks = [];
  phases.forEach((p) => {
    p.tasks.forEach((t) => {
      allSubtasks.push({ sprint: p.name, ...t });
    });
  });

  for (let i = 1; i <= durationDays; i++) {
    const taskIdx = (i - 1) % allSubtasks.length;
    const taskData = allSubtasks[taskIdx];
    const cycle = Math.floor((i - 1) / allSubtasks.length) + 1;
    const cycleSuffix = cycle > 1 ? ` (Part ${cycle})` : "";

    days.push({
      day: i,
      sprintName: taskData.sprint,
      title: `${taskData.title}${cycleSuffix}`,
      concepts: taskData.sub.map((s) => `${s} in ${topic}`),
      task: `Implement a working code module for ${topic} demonstrating ${taskData.title.toLowerCase()}.`,
      resourceQuery: `${topic} ${taskData.title} tutorial guide`,
    });
  }

  return {
    title: `${topic} Engineering Roadmap`,
    topic,
    level: currentLevel,
    totalDays: durationDays,
    dailyCommitment: timePerDay,
    summary: `Structured ${durationDays}-day curriculum tailored for ${currentLevel} learners aiming to master ${topic} for ${goal}.`,
    sprints: phases.map((p) => ({ name: p.name, summary: p.summary })),
    days,
  };
}
