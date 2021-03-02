import { element, by, ElementFinder } from 'protractor';

export default class CourseUpdatePage {
  pageTitle: ElementFinder = element(by.id('schoolarappApp.course.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#course-name'));
  hourInput: ElementFinder = element(by.css('input#course-hour'));
  gradeInput: ElementFinder = element(by.css('input#course-grade'));
  teacherSelect: ElementFinder = element(by.css('select#course-teacher'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setHourInput(hour) {
    await this.hourInput.sendKeys(hour);
  }

  async getHourInput() {
    return this.hourInput.getAttribute('value');
  }

  async setGradeInput(grade) {
    await this.gradeInput.sendKeys(grade);
  }

  async getGradeInput() {
    return this.gradeInput.getAttribute('value');
  }

  async teacherSelectLastOption() {
    await this.teacherSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async teacherSelectOption(option) {
    await this.teacherSelect.sendKeys(option);
  }

  getTeacherSelect() {
    return this.teacherSelect;
  }

  async getTeacherSelectedOption() {
    return this.teacherSelect.element(by.css('option:checked')).getText();
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
