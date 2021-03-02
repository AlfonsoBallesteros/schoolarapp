import { element, by, ElementFinder } from 'protractor';

export default class TypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('schoolarappApp.type.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#type-code'));
  nameInput: ElementFinder = element(by.css('input#type-name'));
  valueInput: ElementFinder = element(by.css('input#type-value'));
  parentInput: ElementFinder = element(by.css('input#type-parent'));
  stateSelect: ElementFinder = element(by.css('select#type-state'));
  referenceSelect: ElementFinder = element(by.css('select#type-reference'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
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

  async setParentInput(parent) {
    await this.parentInput.sendKeys(parent);
  }

  async getParentInput() {
    return this.parentInput.getAttribute('value');
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
  async referenceSelectLastOption() {
    await this.referenceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async referenceSelectOption(option) {
    await this.referenceSelect.sendKeys(option);
  }

  getReferenceSelect() {
    return this.referenceSelect;
  }

  async getReferenceSelectedOption() {
    return this.referenceSelect.element(by.css('option:checked')).getText();
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
