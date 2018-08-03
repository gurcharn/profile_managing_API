=>
    pms (This is profile management system API to process profiles related information)

=>
    How to run it on local environment?
    1. open terminal / command line in root directory.
    2. run command "npm install" to fetch all dependencies.
    3. step 1 & 2 should be followed everytime you pull changes or clone repos from git.
    4. run command "npm start" to run server
    5. server will start running on localhost:4000/pms/

=>
    What does it do?
    
    1. Create / Remove profiles (Company, Customer & Staff).
    2. Update information of profiles.
    3. Search profiles related information of different users.
    
=>
    Database Schema ->
    Company - companyId, companyName, address, email, phone, owner, typeOfWork, joiningDate, renewalDate
    Staff - staffId, companyId, name, email, phone, address, position, department, joiningDate
    Customer - customerId, companyId, staffId, name, address, email, phone, date

    CREATE DATABASE pms;
    USE pms;

    CREATE TABLE company(
        companyId INT PRIMARY KEY AUTO_INCREMENT,
        companyName VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        address VARCHAR(100),
        phone VARCHAR(100) NOT NULL,
        owner VARCHAR(100) NOT NULL,
        typeOfWork VARCHAR(100),
        joiningDate VARCHAR(100) NOT NULL,
        renewalDate VARCHAR(100) NOT NULL
        );

    CREATE TABLE staff(
        companyId INT NOT NULL,
        staffId INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        address VARCHAR(100),
        phone VARCHAR(100),
        position VARCHAR(100) NOT NULL,
        department VARCHAR(100),
        joiningDate VARCHAR(100) NOT NULL
        );
        
    CREATE TABLE customer(
        companyId INT NOT NULL,
        staffId INT NOT NULL,
        customerId INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        address VARCHAR(100),
        phone VARCHAR(100),
        source VARCHAR(100),
        status VARCHAR(100),
        joiningDate VARCHAR(100) NOT NULL,
        comment VARCHAR(300)
        );



=> 
    How to use different endpoints of API. (http://localhost:4000/pms)

    /typeOfProfile/typeOfJob/accessPoint/"parameters"

    typeOfProfile - company / customer / staff
    typeOfJob - signUp / update / search / delete
    accessPoint - email / name / address / id
    parameters - url parameters which needs to be passes example- "customerId"

    JSON body
    {
        "key": "value"
    }