import { element, by, ElementFinder } from 'protractor';

export default class PersonUpdatePage {
  pageTitle: ElementFinder = element(by.id('schoolarappApp.person.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#person-name'));
  surnameInput: ElementFinder = element(by.css('input#person-surname'));
  documentIdInput: ElementFinder = element(by.css('input#person-documentId'));
  documentExpDateInput: ElementFinder = element(by.css('input#person-documentExpDate'));
  phoneNumberInput: ElementFinder = element(by.css('input#person-phoneNumber'));
  telephonNumberInput: ElementFinder = element(by.css('input#person-telephonNumber'));
  birthdateInput: ElementFinder = element(by.css('input#person-birthdate'));
  addressInput: ElementFinder = element(by.css('input#person-address'));
  districtInput: ElementFinder = element(by.css('input#person-district'));
  stratusInput: ElementFinder = element(by.css('input#person-stratus'));
  diseaseInput: ElementFinder = element(by.css('input#person-disease'));
  disabilityInput: ElementFinder = element(by.css('input#person-disability'));
  stateCivilInput: ElementFinder = element(by.css('input#person-stateCivil'));
  ocupationInput: ElementFinder = element(by.css('input#person-ocupation'));
  parentInput: ElementFinder = element(by.css('input#person-parent'));
  stateSelect: ElementFinder = element(by.css('select#person-state'));
  typeIdSelect: ElementFinder = element(by.css('select#person-typeId'));
  genderSelect: ElementFinder = element(by.css('select#person-gender'));
  neighborhoodSelect: ElementFinder = element(by.css('select#person-neighborhood'));
  citySelect: ElementFinder = element(by.css('select#person-city'));
  birthplaceSelect: ElementFinder = element(by.css('select#person-birthplace'));
  nacionalitySelect: ElementFinder = element(by.css('select#person-nacionality'));
  cityExpSelect: ElementFinder = element(by.css('select#person-cityExp'));
  rhSelect: ElementFinder = element(by.css('select#person-rh'));
  epsSelect: ElementFinder = element(by.css('select#person-eps'));
  relationSelect: ElementFinder = element(by.css('select#person-relation'));
  coursesSelect: ElementFinder = element(by.css('select#person-courses'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setSurnameInput(surname) {
    await this.surnameInput.sendKeys(surname);
  }

  async getSurnameInput() {
    return this.surnameInput.getAttribute('value');
  }

  async setDocumentIdInput(documentId) {
    await this.documentIdInput.sendKeys(documentId);
  }

  async getDocumentIdInput() {
    return this.documentIdInput.getAttribute('value');
  }

  async setDocumentExpDateInput(documentExpDate) {
    await this.documentExpDateInput.sendKeys(documentExpDate);
  }

  async getDocumentExpDateInput() {
    return this.documentExpDateInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setTelephonNumberInput(telephonNumber) {
    await this.telephonNumberInput.sendKeys(telephonNumber);
  }

  async getTelephonNumberInput() {
    return this.telephonNumberInput.getAttribute('value');
  }

  async setBirthdateInput(birthdate) {
    await this.birthdateInput.sendKeys(birthdate);
  }

  async getBirthdateInput() {
    return this.birthdateInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setDistrictInput(district) {
    await this.districtInput.sendKeys(district);
  }

  async getDistrictInput() {
    return this.districtInput.getAttribute('value');
  }

  async setStratusInput(stratus) {
    await this.stratusInput.sendKeys(stratus);
  }

  async getStratusInput() {
    return this.stratusInput.getAttribute('value');
  }

  getDiseaseInput() {
    return this.diseaseInput;
  }
  getDisabilityInput() {
    return this.disabilityInput;
  }
  async setStateCivilInput(stateCivil) {
    await this.stateCivilInput.sendKeys(stateCivil);
  }

  async getStateCivilInput() {
    return this.stateCivilInput.getAttribute('value');
  }

  async setOcupationInput(ocupation) {
    await this.ocupationInput.sendKeys(ocupation);
  }

  async getOcupationInput() {
    return this.ocupationInput.getAttribute('value');
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
  async typeIdSelectLastOption() {
    await this.typeIdSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async typeIdSelectOption(option) {
    await this.typeIdSelect.sendKeys(option);
  }

  getTypeIdSelect() {
    return this.typeIdSelect;
  }

  async getTypeIdSelectedOption() {
    return this.typeIdSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption() {
    await this.genderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async genderSelectOption(option) {
    await this.genderSelect.sendKeys(option);
  }

  getGenderSelect() {
    return this.genderSelect;
  }

  async getGenderSelectedOption() {
    return this.genderSelect.element(by.css('option:checked')).getText();
  }

  async neighborhoodSelectLastOption() {
    await this.neighborhoodSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async neighborhoodSelectOption(option) {
    await this.neighborhoodSelect.sendKeys(option);
  }

  getNeighborhoodSelect() {
    return this.neighborhoodSelect;
  }

  async getNeighborhoodSelectedOption() {
    return this.neighborhoodSelect.element(by.css('option:checked')).getText();
  }

  async citySelectLastOption() {
    await this.citySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async citySelectOption(option) {
    await this.citySelect.sendKeys(option);
  }

  getCitySelect() {
    return this.citySelect;
  }

  async getCitySelectedOption() {
    return this.citySelect.element(by.css('option:checked')).getText();
  }

  async birthplaceSelectLastOption() {
    await this.birthplaceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async birthplaceSelectOption(option) {
    await this.birthplaceSelect.sendKeys(option);
  }

  getBirthplaceSelect() {
    return this.birthplaceSelect;
  }

  async getBirthplaceSelectedOption() {
    return this.birthplaceSelect.element(by.css('option:checked')).getText();
  }

  async nacionalitySelectLastOption() {
    await this.nacionalitySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nacionalitySelectOption(option) {
    await this.nacionalitySelect.sendKeys(option);
  }

  getNacionalitySelect() {
    return this.nacionalitySelect;
  }

  async getNacionalitySelectedOption() {
    return this.nacionalitySelect.element(by.css('option:checked')).getText();
  }

  async cityExpSelectLastOption() {
    await this.cityExpSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cityExpSelectOption(option) {
    await this.cityExpSelect.sendKeys(option);
  }

  getCityExpSelect() {
    return this.cityExpSelect;
  }

  async getCityExpSelectedOption() {
    return this.cityExpSelect.element(by.css('option:checked')).getText();
  }

  async rhSelectLastOption() {
    await this.rhSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async rhSelectOption(option) {
    await this.rhSelect.sendKeys(option);
  }

  getRhSelect() {
    return this.rhSelect;
  }

  async getRhSelectedOption() {
    return this.rhSelect.element(by.css('option:checked')).getText();
  }

  async epsSelectLastOption() {
    await this.epsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async epsSelectOption(option) {
    await this.epsSelect.sendKeys(option);
  }

  getEpsSelect() {
    return this.epsSelect;
  }

  async getEpsSelectedOption() {
    return this.epsSelect.element(by.css('option:checked')).getText();
  }

  async relationSelectLastOption() {
    await this.relationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async relationSelectOption(option) {
    await this.relationSelect.sendKeys(option);
  }

  getRelationSelect() {
    return this.relationSelect;
  }

  async getRelationSelectedOption() {
    return this.relationSelect.element(by.css('option:checked')).getText();
  }

  async coursesSelectLastOption() {
    await this.coursesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async coursesSelectOption(option) {
    await this.coursesSelect.sendKeys(option);
  }

  getCoursesSelect() {
    return this.coursesSelect;
  }

  async getCoursesSelectedOption() {
    return this.coursesSelect.element(by.css('option:checked')).getText();
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
