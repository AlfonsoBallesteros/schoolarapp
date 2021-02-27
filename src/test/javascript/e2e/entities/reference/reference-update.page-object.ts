import { element, by, ElementFinder } from 'protractor';

export default class ReferenceUpdatePage {
  pageTitle: ElementFinder = element(by.id('schoolarappApp.reference.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#reference-name'));
  valueInput: ElementFinder = element(by.css('input#reference-value'));
  stateSelect: ElementFinder = element(by.css('select#reference-state'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return this.valueInput.getAttribute('value');
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
