import { element, by, ElementFinder } from 'protractor';

export default class EnrollmentUpdatePage {
  pageTitle: ElementFinder = element(by.id('schoolarappApp.enrollment.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  peaceSafeFileInput: ElementFinder = element(by.css('input#enrollment-peaceSafeFile'));
  academicFileInput: ElementFinder = element(by.css('input#enrollment-academicFile'));
  docStudentFileInput: ElementFinder = element(by.css('input#enrollment-docStudentFile'));
  docDadFileInput: ElementFinder = element(by.css('input#enrollment-docDadFile'));
  docMomFileInput: ElementFinder = element(by.css('input#enrollment-docMomFile'));
  docTutorFileInput: ElementFinder = element(by.css('input#enrollment-docTutorFile'));
  academicPeriodInput: ElementFinder = element(by.css('input#enrollment-academicPeriod'));
  yearInput: ElementFinder = element(by.css('input#enrollment-year'));
  obsInput: ElementFinder = element(by.css('input#enrollment-obs'));
  workingDayInput: ElementFinder = element(by.css('input#enrollment-workingDay'));
  enrollModalityInput: ElementFinder = element(by.css('input#enrollment-enrollModality'));
  legacyInput: ElementFinder = element(by.css('input#enrollment-legacy'));
  stateSelect: ElementFinder = element(by.css('select#enrollment-state'));
  workShopSelect: ElementFinder = element(by.css('select#enrollment-workShop'));
  gradeProxSelect: ElementFinder = element(by.css('select#enrollment-gradeProx'));
  studentSelect: ElementFinder = element(by.css('select#enrollment-student'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPeaceSafeFileInput(peaceSafeFile) {
    await this.peaceSafeFileInput.sendKeys(peaceSafeFile);
  }

  async getPeaceSafeFileInput() {
    return this.peaceSafeFileInput.getAttribute('value');
  }

  async setAcademicFileInput(academicFile) {
    await this.academicFileInput.sendKeys(academicFile);
  }

  async getAcademicFileInput() {
    return this.academicFileInput.getAttribute('value');
  }

  async setDocStudentFileInput(docStudentFile) {
    await this.docStudentFileInput.sendKeys(docStudentFile);
  }

  async getDocStudentFileInput() {
    return this.docStudentFileInput.getAttribute('value');
  }

  async setDocDadFileInput(docDadFile) {
    await this.docDadFileInput.sendKeys(docDadFile);
  }

  async getDocDadFileInput() {
    return this.docDadFileInput.getAttribute('value');
  }

  async setDocMomFileInput(docMomFile) {
    await this.docMomFileInput.sendKeys(docMomFile);
  }

  async getDocMomFileInput() {
    return this.docMomFileInput.getAttribute('value');
  }

  async setDocTutorFileInput(docTutorFile) {
    await this.docTutorFileInput.sendKeys(docTutorFile);
  }

  async getDocTutorFileInput() {
    return this.docTutorFileInput.getAttribute('value');
  }

  async setAcademicPeriodInput(academicPeriod) {
    await this.academicPeriodInput.sendKeys(academicPeriod);
  }

  async getAcademicPeriodInput() {
    return this.academicPeriodInput.getAttribute('value');
  }

  async setYearInput(year) {
    await this.yearInput.sendKeys(year);
  }

  async getYearInput() {
    return this.yearInput.getAttribute('value');
  }

  async setObsInput(obs) {
    await this.obsInput.sendKeys(obs);
  }

  async getObsInput() {
    return this.obsInput.getAttribute('value');
  }

  async setWorkingDayInput(workingDay) {
    await this.workingDayInput.sendKeys(workingDay);
  }

  async getWorkingDayInput() {
    return this.workingDayInput.getAttribute('value');
  }

  async setEnrollModalityInput(enrollModality) {
    await this.enrollModalityInput.sendKeys(enrollModality);
  }

  async getEnrollModalityInput() {
    return this.enrollModalityInput.getAttribute('value');
  }

  getLegacyInput() {
    return this.legacyInput;
  }
  async setStateSelect(state) {
    await this.stateSelect.sendKeys(state);
  }

  async getStateSelect() {
    return this.stateSelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption() {
    await this.stateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async workShopSelectLastOption() {
    await this.workShopSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async workShopSelectOption(option) {
    await this.workShopSelect.sendKeys(option);
  }

  getWorkShopSelect() {
    return this.workShopSelect;
  }

  async getWorkShopSelectedOption() {
    return this.workShopSelect.element(by.css('option:checked')).getText();
  }

  async gradeProxSelectLastOption() {
    await this.gradeProxSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async gradeProxSelectOption(option) {
    await this.gradeProxSelect.sendKeys(option);
  }

  getGradeProxSelect() {
    return this.gradeProxSelect;
  }

  async getGradeProxSelectedOption() {
    return this.gradeProxSelect.element(by.css('option:checked')).getText();
  }

  async studentSelectLastOption() {
    await this.studentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async studentSelectOption(option) {
    await this.studentSelect.sendKeys(option);
  }

  getStudentSelect() {
    return this.studentSelect;
  }

  async getStudentSelectedOption() {
    return this.studentSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
