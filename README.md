## 1. Run Locally

In this section we will detail how to run the application on the local environment.

### 1.1. Run Frontend on Local Environment

In this section we will detail how to run specifically the **frontend** part of the application.

It is required to use at least a node 20.11.1 version.

The **frontend** was made with **React**, so firstly, we need to install the dependencies. You can do that with the following commands:

Run the following command to enter into the "frontend" project's folder.

```sh
cd frontend
```

Install dependencies:

```sh
npm install --legacy-peer-deps
```

After the dependencies have been installed, we could run the application with the following command:

```sh
craco start
```

After it is done, the application will be available on: **localhost:3000**.

### 1.2. Run Backend on Local Environment

In this section we will detail how to run specifically the **backend** part of the application.

1. Creating the MySQL database
   ohoh
   TODO: ...

## 2. DNS

The application is hosted under the following DNS (= Domain Name System): `lucasimageanalyzer.com`.
This domain was bought from the following Domain Name Provider: [GoDaddy](https://www.godaddy.com/en-ph/offers/godaddy).

In the below section we will describe how to add a DNS to the application and what **Domain records** should be set both on the side of the _DNS Provider_ and the _VM (Virtual Machine) Provider_.

### 2.1. How to set Domain Record on the DNS Provider's side?

We can use the above **GoDaddy**, or any other provider for this purpose.
After the DNS is bought, check out the **DNS > Domain Record** section on the provider's side and add the following **Domain Record**:

| Type | Name | Data                    | TTL         |
| ---- | ---- | ----------------------- | ----------- |
| A    | @    | ${IP_ADDRESS_OF_THE_VM} | 600 seconds |
| A    | api  | ${IP_ADDRESS_OF_THE_VM} | 600 seconds |
| A    | www  | ${IP_ADDRESS_OF_THE_VM} | 600 seconds |

In the place of the `${IP_ADDRESS_OF_THE_VM}` you should use your own **VM**'s IP Address (Internet Protocol Address).

### 2.2. How to set the Domain Record on the VM provider's side?

The _VM_ is provided by [Rackforest](rackforest.com).
For this provider, it was enough to set a **Reverse DNS** that is pointing to an already existing DNS name. Here, we just needed to add the following name: `lucasimageanalyzer.com`, as this is our domain.

### 3. Jenkins

In this section we are detailing how to set up the Jenkins Docker Container to run CI/CD pipelines to build, test, and deploy the application to a VM instance.

### 3.1. Installing Jenkins

#### 3.1.1. Creating Jenkins Volume

Create Jenkins Docker Container in the root folder and attach the **.jenkins_home** folder as a volume to it.

```sh
docker run -it --rm -p 8080:8080 -p 50000:50000 -v ./.jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

#### 3.1.2. Unlock Jenkins

After the Jenkins Wizard pulled the latest image from the docker hub, it is required to unlock the Jenkins.

Visit the following url to access jenkins on the local environment: http://localhost:8080/.

A page will be displayed where the Jenkins tells us that the administrator password is stored in the following path: **/var/jenkins_home/secrets/initialAdminPassword**. Because we created a dedicated volume to store the jenkins files, we could locate this file here as well: **.jenkins_home/secrets/initialAdminPassword**. This initial password could be copied from the console output.

Copy that password and paste it into the **"Administrator Password"** input field.

#### 3.1.3. Customize Jenkins

We need to decide what initial plugins should be installed on Jenkins (these could be updated later on the application). Click on the **"Select plugins to install"** option (as we want to decide what plugins should be installed).

Required plugins:

- Locale
- NodeJS
- Git
- Pipeline
- SSH Agent
- Workspace Cleanup

Click on the "install" button.

#### 3.1.4. Create First Admin USer

Set up your new user.

#### 3.1.5. Instance Configuration

This section tells Jenkins that on which url should the Jenkins instance be available. Set the Jenkins Url to the following: http://localhost:8080/ (this is the default).

### 3.2. Set default language

We do not want the Jenkins to use hybridly english and our local language, as it could be confusing where to find the different menu options, or what button should be clicked on the UI. For this purpose, we need to change the local language used by Jenkins.

1. Click on the "gear button" on the top right, or enter the following url: http://localhost:8000/manage.
2. Under **System Configuration**, select the **Appearance** sub menu option, or enter the following url: http://localhost:8080/manage/appearance/
3. Search for the **Default Language** section and select the **English (en)**.
4. Check (Turn it on) the following checkbox: "Ignore browser preference and force this language to all users".
5. Click on the "Save" button.

### 3.3. Set up Tools

1. Click on the "gear button" on the top right of the Jenkins web application. Under **System Configuration**, select the **Tools** sub menu option, or enter the following url: http://localhost:8080/manage/configureTools/
2. Go to the **NodeJS installations** section, and click on the **"+ Add NodeJS"** button.
3. Add a name to the NodeJS (such as "NodeJS 20").
4. Check the **"Install automatically" checkbox**
5. Select the "20.11.1" version for the NodeJS, under the "Unstall from nodejs.org" sub-section
6. Apply the changes and save your configurations.

### 3.4. Set up Credentials

1. Click on the "gear button" on the top right corner of the Jenkins web application. Under **Security**, select the **Credentials** sub menu option, or enter the following url: http://localhost:8080/manage/credentials/
2. Under the **Stores scoped to Jenkins** table, click on the **System** user (Click on his name)
3. Under the **System**'s available credentials, clink on the **Global credentials (unrestricted)**
4. Now on the top right side of the window, click on the "+ Add Credentials" button
5. Under the **New credentials** form, we need to create the following credentials for the Jenkins jobs:
   - Domain:
     - Kind: `Secret text`
     - Scope: `Global`
     - Secret: Domain name of the application without the "https://www." prefix!
     - ID: `lucas-host-domain`
   - api.Domain:
     - Kind: `Secret text`
     - Scope: `Global`
     - Secret: Domain name of the application without the "https://www." prefix, BUT with the prefix of "api.", such as: "api.DOMAIN_NAME"!
     - ID: `lucas-api-domain`
   - Google OAuth Client ID:
     - Kind: `Secret text`
     - Scope: `Global`
     - Secret: Paste here your Google OAth Client ID
     - ID: `lucas-google-oauth-client-id`
   - Google OAuth Client ID:
     - Kind: `Secret text`
     - Scope: `Global`
     - Secret: Paste here your Google OAth Client Secret
     - ID: `lucas-google-oauth-client-secret`

---

---

### 3.4. Create new Pipeline

1. Click on the "New Item" button on the top left, or visit this url: http://localhost:8080/view/all/newJob

add pipeline

approve script

apply + save
