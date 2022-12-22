# PlanQK Cookbook for Java

The PlanQK Cookbook for Java contains general instructions and recipes on how to programmatically perform certain tasks within the PlanQK Platform.
The instructions are written as step-by-step guides on which you can follow like a usual tutorial.

::: tip NOTE
The cookbook uses a Java code generator to create a [PlanQK Platform API](https://platform.planqk.de/qc-catalog/swagger-ui/index.html) client to perform certain operations.
A general API description of all supported operations can be found [here](https://platform.planqk.de/qc-catalog/swagger-ui/index.html).
:::

## How to set up a PlanQK integration project?

First of all, create the following folder structure and files:

```
. 
├── api-client
│   └── pom.xml
├── app
│   ├── pom.xml
│   └── src
│       └── main
│           ├── java
│           └── resources
└── pom.xml
```

**Maven Setup**

On root level paste the following content into `./pom.xml`.

::: details ./pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>de.stoneone.planqk.samples</groupId>
  <artifactId>planqk-samples</artifactId>
  <version>1.0.0-SNAPSHOT</version>
  <packaging>pom</packaging>

  <properties>
    <java.version>11</java.version>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>${java.version}</maven.compiler.source>
    <maven.compiler.target>${java.version}</maven.compiler.target>
    <checkstyle.configLocation>checkstyle.xml</checkstyle.configLocation>

    <!-- Dependency versions -->
    <feign.version>11.10</feign.version>
    <feign-form.version>3.8.0</feign-form.version>
    <jackson.version>2.13.4</jackson.version>
    <jackson-databind-nullable.version>0.2.3</jackson-databind-nullable.version>
    <scribejava.version>8.3.1</scribejava.version>
    <swagger-annotations.version>1.6.7</swagger-annotations.version>
    <javax-annotation.version>1.3.2</javax-annotation.version>
    <junit.version>5.9.0</junit.version>
    <hamcrest.version>2.2</hamcrest.version>
    <commons-io.version>2.11.0</commons-io.version>
  </properties>

  <modules>
    <module>api-client</module>
    <module>app</module>
  </modules>

</project>
```

:::

Paste the following content into `./api-client/pom.xml`.

::: details ./api-client/pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
    <groupId>de.stoneone.planqk.samples</groupId>
    <artifactId>planqk-samples</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <relativePath>../pom.xml</relativePath>
  </parent>

  <artifactId>api-client</artifactId>

  <build>
    <plugins>
      <plugin>
        <groupId>org.openapitools</groupId>
        <artifactId>openapi-generator-maven-plugin</artifactId>
        <executions>
          <execution>
            <id>api-client</id>
            <goals>
              <goal>generate</goal>
            </goals>
            <configuration>
              <inputSpec>https://platform.planqk.de/qc-catalog/v3/api-docs</inputSpec>
              <apiPackage>de.stoneone.planqk.api</apiPackage>
              <modelPackage>de.stoneone.planqk.api.model</modelPackage>
              <invokerPackage>de.stoneone.planqk.api.invoker</invokerPackage>
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
    <pluginManagement>
      <plugins>
        <plugin>
          <groupId>org.openapitools</groupId>
          <artifactId>openapi-generator-maven-plugin</artifactId>
          <version>6.0.0</version>
          <configuration>
            <generatorName>java</generatorName>
            <library>feign</library>
            <groupId>de.stoneone.qc-catalog</groupId>
            <artifactId>api-client</artifactId>
            <generateApiTests>false</generateApiTests>
            <generateModelTests>false</generateModelTests>
            <generateApiDocumentation>false</generateApiDocumentation>
            <generateModelDocumentation>false</generateModelDocumentation>
          </configuration>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>

  <dependencies>
    <dependency>
      <groupId>io.swagger</groupId>
      <artifactId>swagger-annotations</artifactId>
      <version>${swagger-annotations.version}</version>
    </dependency>
    <dependency>
      <groupId>javax.annotation</groupId>
      <artifactId>javax.annotation-api</artifactId>
      <version>${javax-annotation.version}</version>
    </dependency>

    <!-- @Nullable annotation -->
    <dependency>
      <groupId>com.google.code.findbugs</groupId>
      <artifactId>jsr305</artifactId>
      <version>3.0.2</version>
    </dependency>

    <!-- HTTP client: Netflix Feign -->
    <dependency>
      <groupId>io.github.openfeign</groupId>
      <artifactId>feign-core</artifactId>
      <version>${feign.version}</version>
    </dependency>
    <dependency>
      <groupId>io.github.openfeign</groupId>
      <artifactId>feign-jackson</artifactId>
      <version>${feign.version}</version>
    </dependency>
    <dependency>
      <groupId>io.github.openfeign</groupId>
      <artifactId>feign-slf4j</artifactId>
      <version>${feign.version}</version>
    </dependency>
    <dependency>
      <groupId>io.github.openfeign.form</groupId>
      <artifactId>feign-form</artifactId>
      <version>${feign-form.version}</version>
    </dependency>
    <dependency>
      <groupId>io.github.openfeign</groupId>
      <artifactId>feign-okhttp</artifactId>
      <version>${feign.version}</version>
    </dependency>

    <!-- JSON processing: jackson -->
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-core</artifactId>
      <version>${jackson.version}</version>
    </dependency>
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-annotations</artifactId>
      <version>${jackson.version}</version>
    </dependency>
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>${jackson.version}</version>
    </dependency>
    <dependency>
      <groupId>org.openapitools</groupId>
      <artifactId>jackson-databind-nullable</artifactId>
      <version>${jackson-databind-nullable.version}</version>
    </dependency>
    <dependency>
      <groupId>com.fasterxml.jackson.datatype</groupId>
      <artifactId>jackson-datatype-jsr310</artifactId>
      <version>${jackson.version}</version>
    </dependency>
    <dependency>
      <groupId>com.github.scribejava</groupId>
      <artifactId>scribejava-core</artifactId>
      <version>${scribejava.version}</version>
    </dependency>
  </dependencies>

</project>
```

:::

Paste the following content into `./app/pom.xml`.

::: details ./app/pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
    <artifactId>planqk-samples</artifactId>
    <groupId>de.stoneone.planqk.samples</groupId>
    <version>1.0.0-SNAPSHOT</version>
    <relativePath>../pom.xml</relativePath>
  </parent>

  <artifactId>app</artifactId>

  <dependencies>
    <dependency>
      <groupId>de.stoneone.planqk.samples</groupId>
      <artifactId>api-client</artifactId>
      <version>${project.version}</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
  </dependencies>

</project>
```

:::

In addition to the folder structure above, you may want to create a Java package structure underneath `./app/src/main/java`.

The `api-client` folder will contain the generated API client to communicate with the PlanQK Platform.
In the `pom.xml` file we define how to generate the client with the [openapi-generator-maven-plugin](https://github.com/OpenAPITools/openapi-generator/tree/master/modules/openapi-generator-maven-plugin) and the third-party libraries that we need.

::: details INFO: The following third party libraries were used in the ./api-client/pom.xml

| Group ID                         | Artifact ID                 | Version |
|----------------------------------|-----------------------------|---------|
| `io.swagger`                     | `swagger-annotations`       | 1.6.7   |
| `javax.annotation`               | `javax.annotation-api`      | 1.3.2   |
| `com.google.code.findbugs`       | `jsr305`                    | 3.0.2   |
| `io.github.openfeign`            | `feign-core`                | 11.10   |
| `io.github.openfeign`            | `feign-jackson`             | 11.10   |
| `io.github.openfeign`            | `feign-slf4j`               | 11.10   |
| `io.github.openfeign.form`       | `feign-form`                | 3.8.0   |
| `io.github.openfeign`            | `feign-okhttp`              | 11.10   |
| `com.fasterxml.jackson.core`     | `jackson-core`              | 2.13.4  |
| `com.fasterxml.jackson.core`     | `jackson-annotations`       | 2.13.4  |
| `com.fasterxml.jackson.core`     | `jackson-databind`          | 2.13.4  |
| `com.fasterxml.jackson.datatype` | `jackson-datatype-jsr310`   | 2.13.4  |
| `org.openapitools`               | `jackson-databind-nullable` | 0.2.3   |
| `com.github.scribejava`          | `scribejava-core`           | 8.3.1   |

:::

**Execute Maven Build**

After following the above steps, navigate to your project root folder and run:

```bash
mvn clean package
```

::: tip
A complete Maven project including a couple of example can be found [here](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples).
:::

## How to authenticate with the PlanQK platform?

First of all, create a Java class called `Application.java`.
You may place this file to `./app/src/main/java` or into your desired Java package structure.

Add the following content as a minimal baseline:

```java
import de.stoneone.planqk.api.invoker.ApiClient;
import de.stoneone.planqk.samples.feign.CustomDecoder;

public class Application {

    public static void main(String[] args) {
        String token = "Your personal access token";
        ApiClient apiClient = new ApiClient("apiKey", token);
        apiClient.setFeignBuilder(apiClient.getFeignBuilder().decoder(new CustomDecoder(apiClient.getObjectMapper())));
    }
}
```

::: tip NOTE
The custom Feign decoder to monkey-patch the generated decoder class is required to support `byte[]` and `String` return types.
You can find the complete class [here](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/feign/CustomDecoder.java).
:::

Next, you have to create a [personal access token](https://platform.planqk.de/settings/access-tokens).

1. Log-in to the PlanQK Platform and go to `Settings > Personal Access Tokens`.
2. Click on **Add Access Token.**
3. Select an unique name for your token.
4. At least select the `api` scope for the new token.
5. After the token is generated, copy it and use it to authenticate with PlanQK as shown in the example below.

Add your token to the respective `token` variable:

```java
String token = "Your personal access token";
```

To verify the communication with the PlanQK Platform, you may add the following code and afterwards execute the created `main()` method:

```java
// API interface to manage PlanQK Services
ServicePlatformServicesApi servicesApi = apiClient.buildClient(ServicePlatformServicesApi.class);

servicesApi.getServices("CREATED", "");
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/AuthenticationSample.java)

## How to create a managed PlanQK Service?

In the following we assume you already have a PlanQK Service implemented and the zipped code archive ready to use.
For the following tutorial, you just need to download the [PlanQK user code template](https://storage.googleapis.com/yeoman-templates/latest/template.zip) and rename it to `user_code.zip`.

::: details
However, to implement a fresh new PlanQK Service for the PlanQK Platform you need to complete the following prerequisites:

1. First, you need to download or generate the PlanQK user code template as explained in the [documentation](../docs/service-platform.md#1-embedding-the-python-code-into-the-user-code-template).
2. Implement your service logic by modifying the PlanQK user code template according to your business requirements.
3. Before deploying it to the PlanQK platform, you should test the correct behavior of your service on [your local machine](../docs/service-platform.md#2-test-your-service-locally-and-with-docker).
   This will help you to identify and correct potential errors before the actual deployment process.
4. Create a ZIP archive of your PlanQK Service code.
5. Although not absolutely necessary for providing a service, we do strongly recommend to write an [API description](../docs/service-platform.md#3-create-an-api-spec-file-for-your-service) for your PlanQK service.
   This API description gives users of the service a manual on how they are able to communicate with the service, namely how they can send the input for problems and receive the solutions.

:::

Now, that you have your zip archive ready (e.g., a file called `user_code.zip`), you have to specify the following information to create a PlanQK Service programmatically:

| Attribute name   | Description                                                                        |
|------------------|------------------------------------------------------------------------------------|
| `name`           | Your desired name for your PlanQK Service (required)                               |
| `quantumBackend` | The quantum backend you want to use. Options: `NONE`, `DWAVE`, `IBM` (required)    |
| `description`    | A detailed description of your service (optional)                                  |                                                                  |
| `userCode`       | For managed services, specify the path to your zipped code archive                 |
| `apiDefinition`  | Specify the path to your OpenAPI description for your service (optional)           |

Extend your `Application.java` class and add the following:

```java
ServicePlatformServicesApi servicesApi = apiClient.buildClient(ServicePlatformServicesApi.class);

String serviceName = "Your service name";
String description = "Your service description";
File userCode = new File("Absolute path to the user_code.zip file");
File apiDefinition = new File("Absolute path to the OpenAPI definition");
Integer cpuConfiguration = null; // null to use default CPU configuration: 1 vCPU
Integer memoryConfiguration = null; // null to use default memory configuration: 2048 = 2GB
String usePlatformToken = "FALSE"; // FALSE to use own backend tokens in case 'quantumBackend' is 'DWAVE' or 'IBM'

/*
 * At the moment each managed PlanQK Service may communicate with exactly one quantum cloud provider,
 * e.g., with IBM Quantum Cloud or D-Wave Leap. To configure the service properly, you may uncomment
 * one of the following lines.
 */
String quantumBackend = "NONE";
// String quantumBackend = "IBM";
// String quantumBackend = "DWAVE";

ServiceDto service = servicesApi.createManagedService(
    serviceName,
    description,
    quantumBackend,
    usePlatformToken,
    cpuConfiguration,
    memoryConfiguration,
    null,
    userCode,
    apiDefinition
);
```

The service creation takes approx. one or two minutes to complete.
You can go to [My Services](https://platform.planqk.de/services) and observe the build status.

A PlanQK Service can have multiple versions.
Therefore, each service object has a list of so-called _service definitions_ aka. _versions_.
However, at the moment, there will always be one service definition.
In the future, you will be able to maintain multiple versions of your service with this.

Extend your `Application.java` as follows:

```java
ServiceDefinitionDto version = service.getServiceDefinitions().stream().findFirst().orElseThrow();
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/ServiceManagedCreateSample.java)

## How to wait until a managed PlanQK Service has been built by the PlanQK Platform?

As mentioned above the service creation takes approx. one or two minutes to complete.
Hence, you need to wait for the creation process to be completed.

The following code block shows some boilerplate code to wait until the PlanQK Service has been successfully created:

```java
/**
 * Waits up to 5 minutes till the PlanQK Service has been created, otherwise an exception is thrown.
 */
private static void waitForServiceToBeCreated(ServicePlatformServicesApi serviceApi, UUID serviceId, UUID versionId) throws Exception {
    int timer = 0;
    BuildJobDto build;
    do {
        TimeUnit.SECONDS.sleep(15);

        // Check build status
        build = serviceApi.getBuildStatus(serviceId, versionId, null);

        if ((timer += 15) > 300) {
            throw new RuntimeException("Timeout exceeded waiting for PlanQK Service to be created");
        }
    } while (build.getStatus() == BuildJobDto.StatusEnum.WORKING || build.getStatus() == BuildJobDto.StatusEnum.QUEUED);

    if (build.getStatus() == BuildJobDto.StatusEnum.FAILURE) {
        throw new RuntimeException("Error creating PlanQK Service");
    }
}
```

::: warning
You may adapt the code above with your own logic before use this in any production-like environment.
:::
 
Add the above method to your `Application.java` and call it from the main method:

```java
waitForServiceToBeCreated(servicesApi, service.getId(), version.getId());
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/ServiceManagedCreateSample.java)

## How to connect a self-hosted service with the PlanQK Platform?

You can connect a self-hosted service with the PlanQK Platform by creating a so-called "external" service if you just want the PlanQK platform to manage the access to it.

The following properties are required to create a self-hosted PlanQK Service:

| Attribute name       | Description                                                                                   |
|----------------------|-----------------------------------------------------------------------------------------------|
| `name`               | Your desired name for your PlanQK Service (required)                                          |
| `quantumBackend`     | The quantum backend your self-hosted service uses. Options: `NONE`, `DWAVE`, `IBM` (required) |
| `description`        | A detailed description of your service (optional)                                             |
| `productionEndpoint` | Supply a valid URL to your self-hosted service (required)                                     |
| `apiDefinition`      | Specify the path to your OpenAPI description for your service (optional)                      |

Extend or adapt your `Application.java` class and add the following:

```java
ServicePlatformServicesApi servicesApi = apiClient.buildClient(ServicePlatformServicesApi.class);

String name = "Your service name";
String description = "Your service description";
String productionEndpoint = "Your public endpoint URL";
File apiDefinition = new File("Absolute path to your OpenAPI definition");

/*
 * Uncomment one of the following lines if your self-hosted service communicates with of the quantum cloud providers,
 * e.g., with IBM Quantum Cloud or D-Wave Leap.
 */
String quantumBackend = "NONE";
// String quantumBackend = "IBM";
// String quantumBackend = "DWAVE";

ServiceDto service = servicesApi.createExternalService(
    name,
    productionEndpoint,
    description,
    quantumBackend,
    "NONE", // no security config
    null, // username
    null, // password
    null,
    apiDefinition
);
```

In this case, it is not necessary to wait for the service to be created.
You are immediately able to work with your new service like described in the following sections.

A PlanQK Service can have multiple versions.
Therefore, each service object has a list of so-called _service definitions_ aka. _versions_.
However, at the moment, there will always be one service definition.
In the future, you will be able to maintain multiple versions of your service with this.

Extend your `Application.java` as follows:

```java
ServiceDefinitionDto version = service.getServiceDefinitions().stream().findFirst().orElseThrow();
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/ServiceExternalCreateSample.java)

## How to update a PlanQK Service?

You may update your service in case you want to change certain information.
The following attributes can be updated:

- The description of your service
- The related industries your service can be used in
- Your API definition describing the service interface
- The updated service code supplied inside a zip archive

As a prerequisite, you need a ready to use PlanQK Service:

```java
ServiceDto service = servicesApi.createManagedService((/* ... */);
ServiceDefinitionDto version = service.getServiceDefinitions().stream().findFirst().orElseThrow();

waitForServiceToBeCreated(/* ... */)
```

Alternatively, you may search for an existing PlanQK Service using its ID or by its name.

* Search by ID:
  ```java
  var service = servicesApi.getService(<id>, null);
  ```
* Search by name:
  ```java
  List<ServiceDto> services = servicesApi.getServices("CREATED", "");
  ServiceDto service = services.stream()
       .filter(s -> "My Service Name".equalsIgnoreCase(s.getName()))
       .findFirst()
       .orElseThrow();
  ```

**Update description and related industries:**

First, you need to retrieve a list of all industries and select an appropriate industry id to be assigned to your service:

```java
// Retrieve a list of available industries
List<IndustryDto> industries = servicesApi.getIndustries();

// Retrieve 'information_technology' industry from the list
IndustryDto informationTechnology = industries.stream()
    .filter(industry -> "information_technology".equals(industry.getName()))
    .findFirst()
    .orElseThrow();
```

Then, use the following code to update your service:

```java
UpdateVersionRequest updateRequest = new UpdateVersionRequest()
    .description("Updated description")
    .addIndustriesItem(new IndustryDto().id(informationTechnology.getId()));

version = servicesApi.updateServiceVersion(service.getId(), version.getId(), updateRequest, null);
```

To remove all assigned industries, apply the following code:

```java
UpdateVersionRequest updateRequest=new UpdateVersionRequest();
    updateRequest.setIndustries(new ArrayList<>());
    version=servicesApi.updateServiceVersion(service.getId(),version.getId(),updateRequest,null);
```

**Update your service code:**

```java
File userCode = new File("Path to the updated user_code.zip file");
version = servicesApi.updateSourceCode(service.getId(), version.getId(), userCode, null);

waitForServiceToBeCreated(/* ... */);
```

**Update your API definition:**

```java
File apiDefinition = new File("Path to the updated API definition");
servicesApi.updateApiDefinition(service.getId(), version.getId(), apiDefinition, null);
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/ServiceUpdateSample.java)

## How to delete a PlanQK Service?

Assuming you already created a PlanQK Service, you can delete it by using its ID and the `deleteService()` method.
To get a PlanQK Service ID, you may search for an existing service:

```java
List<ServiceDto> services = servicesApi.getServices("CREATED", "");

String name = "Your service name";

// Filter the list by name
ServiceDto service = services.stream()
    .filter(s -> name.equalsIgnoreCase(s.getName()))
    .findFirst()
    .orElseThrow();
```

Afterwards, you can add the following to your `Application.java`:

```java
servicesApi.deleteService(service.getId(), null);
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/ServiceFindAndDeleteSample.java)

## How to make my PlanQK Service accessible to other users?

There are two ways to make a service accessible for other users:
(1) You can publish your service internally to run PlanQK Jobs or test its correct behaviour or
(2) publicly via the PlanQK Marketplace if you want to monetize your service.

### Publish service internally

Assuming you already created a PlanQK Service, you can add the following to your `Application.java`:

```java
version = servicesApi.publishServiceInternal(service.getId(), version.getId(), null);
```

You may check if your service is in the correct lifecycle state:

```java
if (version.getLifecycle() != ServiceDefinitionDto.LifecycleEnum.ACCESSIBLE) {
    log.warn("Service could not be published internally");
}
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/ServicePublishInternalSample.java)

### Publish service to PlanQK Marketplace

Assuming you already created a PlanQK Service, you can add the following to your `Application.java`:

```java
version = servicesApi.publishService(service.getId(), version.getId(), null);
```

You may check if your service is in the correct lifecycle state:

```java
if (version.getLifecycle() != ServiceDefinitionDto.LifecycleEnum.PUBLISHED) {
    log.warn("Service could not be published");
}
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/ServicePublishSample.java)

### Unpublish a PlanQK Service

Either way, you can use the following code to simply unpublish your PlanQK Service again:

```java
servicesApi.unpublishService(service.getId(), version.getId(), null);
```

## How to create a PlanQK Application?

To access any PlanQK Service programmatically, you have to create a PlanQK Application.
A PlanQK Application conveys the credentials used to authenticate your PlanQK Service execution requests.
Further, a PlanQK Application is used to subscribe to one or more PlanQK Services - either your own services or services from other users.
This means, the PlanQK Application itself handles the _authentication_ and a subscription to a service handles the
_authorization_.

Extend the `Application.java` as follows:

```java
// API interface to manage PlanQK Applications
ServicePlatformApplicationsApi applicationsApi = apiClient.buildClient(ServicePlatformApplicationsApi.class);

String name = "My Application";
ApplicationDto application = applicationsApi.createApplication(new CreateApplicationRequest().name(name), null);
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/ApplicationCreateSample.java)

## How to delete a PlanQK Application?

Assuming you already created a PlanQK Application, you can delete it by using its ID and the `deleteApplication()` method.
To get a PlanQK Service ID, you may search for an existing service:

```java
List<ApplicationDto> applications = applicationsApi.getApplications(null);

String name = "My Application";

// Filter the list by name
ApplicationDto application = applications.stream()
    .filter(a -> name.equalsIgnoreCase(a.getName()))
    .findFirst()
    .orElseThrow();
```

Afterwards, you can add the following to your `Application.java` to delete your PlanQK Application:

```java
applicationsApi.deleteApplication(application.getId(), null);
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/ApplicationFindAndDeleteSample.java)

## How to subscribe to internally published PlanQK Services?

To test the correct behaviour of your own services you may publish it _for internal use_.
This means only you can subscribe to it by a PlanQK Application.

As a prerequisite for the subscription you need a PlanQK Service:

```java
ServiceDto service = servicesApi.createService(/* ... */);
ServiceDefinitionDto version = service.getServiceDefinitions().stream().findFirst().orElseThrow();

waitForServiceToBeCreated(/* ... */);
```

Then, publish your new service internally:

```java
servicesApi.publishServiceInternal(/* ... */);
```

Afterwards, you have to create a PlanQK Application to establish a subscription:

```java
ApplicationDto application = applicationsApi.createApplication(/* ... */);
```

Finally, create a _subscription request_ object and trigger the operation:

```java
CreateInternalSubscriptionRequest subscriptionRequest = new CreateInternalSubscriptionRequest()
    .serviceId(service.getId())
    .applicationId(application.getId());

SubscriptionDto subscription = applicationsApi.createInternalSubscription(application.getId(), subscriptionRequest, null);
```

You may add the following code to retrieve a list of all active subscriptions:

```java
List<SubscriptionDto> subscriptions = applicationsApi.getApplicationSubscriptions(application.getId(), null);
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/SubscribeInternalServiceSample.java)

## How to subscribe to PlanQK Services published in the PlanQK Marketplace?

Whenever you want to interact with services from the marketplace, you must be subscribed to them with an application.
Applications hold all necessary information, e.g., authentication credentials, for a secure communication with the service from an external source.

In this step, we assume you want to subscribe to any service in the PlanQK Marketplace (which is not necessarily yours).

As a prerequisite for the subscription you need a PlanQK Application:

```java
ApplicationDto application = applicationsApi.createApplication(/* ... */);
```

At this stage, you have two options:
(1) You may search for a service in PlanQK Marketplace programmatically, e.g., by the service name, or
(2) you may look up the PlanQK Service ID on the PlanQK Platform (`Marketplace > Services > Service Details > Technical Specifications`) to directly subscribe to it.

### Search by name programmatically

```java
// Get all available PlanQK Services
List<ApiDto> services = marketplaceApi.findServices();

String serviceName = "My Service";

// Filter the list by name
ApiDto service = services.stream().filter(s -> serviceName.equalsIgnoreCase(s.getName())).findAny().orElseThrow();
```

### Use PlanQK Service ID found on PlanQK Platform

```java
ApiDto service = marketplaceApi.findService(<service id>);
```

### Select a suitable pricing plan

Each PlanQK Service has at least one pricing plan.
You must select a suitable one, either a "free" plan if available of a "paid" plan, to create an active subscription.

```java
// We assume here your selected PlanQK Service provides a "free" plan
PricingPlanDto freePlan =
    service.getPricingPlans().stream().filter(p -> PricingPlanDto.TypeEnum.FREE == p.getType()).findFirst().orElseThrow();
```

### Create the subscription

```java
CreateSubscriptionRequest subscriptionRequest = new CreateSubscriptionRequest()
    .applicationId(application.getId())
    .pricingPlanId(freePlan.getId());

marketplaceApi.createSubscription(service.getId(), subscriptionRequest);
```

You may add the following code to retrieve a list of all active subscriptions:

```java
List<SubscriptionDto> subscriptions = applicationsApi.getApplicationSubscriptions(application.getId(), null);
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/SubscribeServiceSample.java)

## Working with PlanQK Organizations

To interact with organizations we first have to create one.
Following this [link](../docs/additional-information.md#organizations) you can find more information about organizations and how to create one.

To perform operations in organization-context, you need to add the ID of your organization to the respective API operations
For example, the `createService(...)` methode has an `organizationId` parameter that must be use in this regard.
If this parameter is set to `null`, you operate in your personal space.

::: tip
The ID of your organization can be found on your [organization details page](https://platform.planqk.de/settings/organizations) on the PlanQK Platform.
:::

Extend your `Application.java` class and add the following:

```java
String organizationId = "<id of your organization>";
```

### Share a PlankQK Service in an Organization

```java
ServiceDto service = servicesApi.createManagedService(
    serviceName,
    description,
    quantumBackend,
    usePlatformToken,
    cpuConfiguration,
    memoryConfiguration,
    organizationId,
    userCode,
    apiDefinition
);
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/OrganizationSample.java)

### Share a PlanQK Application in an Organization

```java
String name = "My Application";
ApplicationDto application = applicationsApi.createApplication(new CreateApplicationRequest().name(name), organizationId);
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/OrganizationSample.java)

### Create internal subscriptions to PlanQK Services within an Organization

```java
CreateInternalSubscriptionRequest subscriptionRequest = new CreateInternalSubscriptionRequest()
    .serviceId(service.getId())
    .applicationId(application.getId());
            
SubscriptionDto subscription = applicationsApi.createInternalSubscription(application.getId(), subscriptionRequest, organizationId);
```

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/OrganizationSample.java)

## How to execute a PlanQK service?

For the sake of the tutorial we assume you either published your own PlanQK Service internally and subscribed to it, or you just subscribed to PlanQK Service found on the PlanQK Marketplace.

First of all, you have to acquire an access token based on your PlanQK Application credentials.
Extend your `Application.java` with the following:

```java
AccessTokenDto accessToken = applicationsApi.getAccessToken(application.getId(), null);
```

::: tip NOTE
This access token must be sent as "Authorization" header in any request of the PlanQK Service API.
The header must follow the following template: `Authorization: Bearer <your access token>`.
:::

Each managed PlanQK Service provides three HTTP endpoints as its API (this may differ for "external" PlanQK Services, therefore, check in "Marketplace > Services > Service Details > Technical Specifications" the published API description):

1. `POST /`: Executes the service in an asynchronous fashion and returns an execution id
2. `GET /<execution id>`: Used to check the status of your execution
3. `GET /<execution id>/result`: Used to retrieve the final result for your execution

In the following, we use the open source library `OkHttp` to execute HTTP requests.
Further, we use `Jackson` to deserialize the response types to a custom DTO class

Let's prepare the input for the service execution.
Create a file, e.g. `input.json`, containing the `data` and `params` JSON structure as described by the PlanQK Service API description.

::: details Example: input.json

```json
{
  "data": {
    "values": [
      1,
      5.2,
      20,
      7,
      9.4
    ]
  },
  "params": {
    "round_off": true
  }
}
```

:::

Extend your `Application.java` with the following:

```java
File input = new File("Absolute path to your input file, e.g., 'input.json'");

RequestBody payload = RequestBody.create(input, MediaType.parse("application/json"));
```

Now execute the service with the following code:

```java
ServiceExecutionDto execution = executeService(version, payload, accessToken);
```

The method `executeService()` is a custom method utilizing the `OkHttp` client to execute HTTP requests.
Further, the return value of `executeService()` is a custom class to represent the API response as an object (utilizing `Jackson`).
Both can be found next:

::: details Method executeService()

```java
private static ServiceExecutionDto executeService(ServiceDefinitionDto version, RequestBody body, AccessTokenDto accessToken) throws Exception {
    Request request = new Request.Builder()
        .post(body)
        .url(version.getGatewayEndpoint())
        .addHeader("Authorization", "Bearer " + accessToken.getToken())
        .addHeader("Content-Type", "application/json")
        .build();
    String json;
    try (Response response = httpClient.newCall(request).execute()) {
        json = response.body().string();
    }
    return objectMapper.readValue(json, ServiceExecutionDto.class);
}
```

:::

::: details Class ServiceExecutionDto.java

```java
package de.stoneone.planqk.samples.model;

public class ServiceExecutionDto {

    private String id;

    /**
     * Status is either UNKNOWN, PENDING, RUNNING, SUCCEEDED, or FAILED.
     */
    private String status;

    private String createdAt;

    // constructors omitted

    // getters and setters omitted
}
```

:::

Due to the fact the execution is asynchronous, you have to wait until the has been successfully executed.
Extend your `Application.java` with the following code:

```java
execution = waitForExecutionToBeFinished(version, execution, accessToken);
log.info("Execution status: {}", execution.getStatus());
```

::: details Method waitForExecutionToBeFinished()

```java
/**
 * Waits up to 5 minutes for a PlanQK Service execution to finish.
 */
private static ServiceExecutionDto waitForExecutionToBeFinished(ServiceDefinitionDto version,
                                                                ServiceExecutionDto execution,
                                                                AccessTokenDto accessToken) throws Exception {
    int timer = 0;
    ServiceExecutionDto e = execution;
    do {
        TimeUnit.SECONDS.sleep(15);

        // Check execution status
        e = getExecutionStatus(version, e, accessToken);

        if ((timer += 15) > 300) {
            throw new RuntimeException("Timeout exceeded waiting for PlanQK Service execution to be finished");
        }
    } while ("PENDING".equals(execution.getStatus()) || "RUNNING".equals(execution.getStatus()) || "UNKNOWN".equals(execution.getStatus()));

    return e;
}

private static ServiceExecutionDto getExecutionStatus(ServiceDefinitionDto version, ServiceExecutionDto execution, AccessTokenDto accessToken) throws Exception {
    Request request = new Request.Builder()
        .get()
        .url(version.getGatewayEndpoint() + "/" + execution.getId())
        .addHeader("Authorization", "Bearer " + accessToken.getToken())
        .build();
    String json;
    try (Response response = httpClient.newCall(request).execute()) {
        json = response.body().string();
    }
    return objectMapper.readValue(json, ServiceExecutionDto.class);
}
```

:::

If the service execution was successful, you may retrieve the result of it:

```java
if ("SUCCEEDED".equals(execution.getStatus())) {
    String result = getExecutionResult(version, execution, accessToken);
    log.info("Execution result: {}", result);
}
```

::: details Method getExecutionResult()

```java
private static String getExecutionResult(ServiceDefinitionDto version, ServiceExecutionDto execution, AccessTokenDto accessToken) throws Exception {
    Request request = new Request.Builder()
        .get()
        .url(version.getGatewayEndpoint() + "/" + execution.getId() + "/result")
        .addHeader("Authorization", "Bearer " + accessToken.getToken())
        .build();
    String json;
    try (Response response = httpClient.newCall(request).execute()) {
        json = response.body().string();
    }
    return json;
}
```

:::

Congratulation, you successfully executed your subscribed PlanQK Service.

[Code Example](https://github.com/PlanQK/planqk-platform-samples/tree/master/java/planqk-samples/app/src/main/java/de/stoneone/planqk/samples/ServiceExecutionSample.java)
