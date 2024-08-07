"use strict";
class Department {
    constructor(id, name, employees = []) {
        this.id = id;
        this.name = name;
        this.employees = employees;
        this.name = name;
        console.log(`Department.fiscalYear:\n${Department.fiscalYear}`);
    }
    // static method 
    // a method you call directly on a class, not on an object created based on it
    // allow access of Department.createEmployee()
    // without instantiating 
    // e.g.
    // Department.createEmployee();
    // no need to
    // const businessDepartment = new Department(id, name, employees[])
    static createEmployee(name) {
        return { name: name };
    }
    // describe(this: Department) {
    //     console.log(`Department.id: ${this.id}`);
    //     console.log(`Department.name: ${this.name}`);
    // }
    addEmployee(employee) {
        this.employees.push(employee);
        console.log(`Added this.employees:\n${this.employees}`);
    }
    printEmployeeInformation() {
        console.log(`this.employees.length:\n${this.employees.length}`);
        console.log(`current this.employees:\n${this.employees}`);
    }
}
// private id: string;
//public readonly name: string;
//private employees: string[] = [];
// allowing classes inheriting this class Department
// to amend this.employees
//protected employees: string[] = [];
Department.fiscalYear = 2077;
// Class Inheritance
class ITDepartment extends Department {
    constructor(id, admins) {
        // super bases on class Department
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log(`${this.name} - ID: ${this.id}`);
    }
    printAdmins() {
        console.log(`this.admins:\n${this.admins}`);
    }
    printFiscalYear() {
        console.log(`ITDepartment.fiscalYear: ${ITDepartment.fiscalYear}`);
    }
}
// singleton
class AccountingDepartment extends Department {
    // getter method
    // making lastReport accessible to this class
    // using closures hoisting
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No latest report found');
    }
    // setter method
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('Please pass in a valid value!');
        }
        this.addReport(value);
    }
    // private constructor = cannot instantiate a class
    // e.g. cannot do below
    // const accounting = new AccountingDepartment(id, reports[])
    // sub-classes can only inherit from this base class
    // e.g.
    // class subClass extends AccountingDepartment {}
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[reports.length - 1];
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment(2, []);
        return this.instance;
    }
    describe() {
        console.log(`${this.name} Department - ID: ${this.id}`);
    }
    addEmployee(name) {
        const forbidden = 'Max';
        if (name === forbidden) {
            console.log(`forbidden: ${forbidden} cannot be added`);
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(`this.reports:\n${this.reports}`);
    }
    printFiscalYear() {
        console.log(`AccountingDepartment.fiscalYear: ${AccountingDepartment.fiscalYear}`);
    }
}
const employee1 = Department.createEmployee('Max2');
console.log(`const employee1 = Department.createEmployee('Max')`);
console.log(employee1, Department.fiscalYear);
// constructor(id: number, admins: string[]) {...}
const it = new ITDepartment(1, ['Berlin']);
it.addEmployee('Max');
it.addEmployee('Manu');
const itEmployee3 = ITDepartment.createEmployee('itEmployee3');
console.log('itEmployee3\n', itEmployee3);
it.describe();
it.printAdmins();
it.name = 'IT';
it.printEmployeeInformation();
it.printFiscalYear();
it.printEmployeeInformation();
console.log(`\n`);
// constructor(id: number, private reports: string[]) {...}
// const accounting = new AccountingDepartment(2, []);
// using class.staticMethod(); to instantiate
const accounting = AccountingDepartment.getInstance();
// using setter method to edit private class.fieldValue
accounting.mostRecentReport = 'Year End Report';
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.addEmployee('Berlin');
const accountingEmployee3 = AccountingDepartment.createEmployee('accountingEmployee3');
console.log('accountingEmployee3\n', accountingEmployee3);
accounting.describe();
accounting.printFiscalYear();
// accounting.printEmployeeInformation();
// accounting.addReport('Something went wrong...');
// accounting.printReports();
// accessing getter method 
// get mostRecentReport() {...}
// in class AccountingDepartment
console.log(`accounting.mostRecentReport:\n${accounting.mostRecentReport}`);
// creating a new Department object 'Accounting'
// using Department blueprint
// const accounting = new Department(1, 'Accounting');
// accounting.addEmployee('Max');
// accounting.addEmployee('Manu');
// accounting.describe();
// accounting.printEmployeeInformation();
// this public class allows others
// to edit class accounting.employees to ruin the class
//accounting.employees[2] = 'Anna';
// console.log(`accounting:\n${accounting}`);
// console.log(`accounting.name:\n${accounting.name}`);
// destructuring class Department
// including both Department.name & Department.describe()
// const accountingCopy = { 
//     name: 'accountingCopy', 
//     describe: accounting.describe 
// };
// accountingCopy.describe();
