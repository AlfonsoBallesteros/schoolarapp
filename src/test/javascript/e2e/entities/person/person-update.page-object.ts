import { element, by, ElementFinder } from 'protractor';

export default class PersonUpdatePage {
  pageTitle: ElementFinder = element(by.id('schoolarappApp.person.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#person-name'));
  surnameInput: ElementFinder = element(by.css('input#person-surname'));
  birthdateInput: ElementFinder = element(by.css('input#person-birthdate'));
  phoneNumberInput: ElementFinder = element(by.css('input#person-phoneNumber'));
  districtInput: ElementFinder = element(by.css('input#person-district'));
  neighborhoodInput: ElementFinder = element(by.css('input#person-neighborhood'));
  stratusInput: ElementFinder = element(by.css('input#person-stratus'));
  addressInput: ElementFinder = element(by.css('input#person-address'));
  rhInput: ElementFinder = element(by.css('input#person-rh'));
  diseaseInput: ElementFinder = element(by.css('input#person-disease'));
  disabilityInput: ElementFinder = element(by.css('input#person-disability'));
  relationsInput: ElementFinder = element(by.css('input#person-relations'));
  stateCivilInput: ElementFinder = element(by.css('input#person-stateCivil'));
  professionInput: ElementFinder = element(by.css('input#person-profession'));

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

  async setBirthdateInput(birthdate) {
    await this.birthdateInput.sendKeys(birthdate);
  }

  async getBirthdateInput() {
    return this.birthdateInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setDistrictInput(district) {
    await this.districtInput.sendKeys(district);
  }

  async getDistrictInput() {
    return this.districtInput.getAttribute('value');
  }

  async setNeighborhoodInput(neighborhood) {
    await this.neighborhoodInput.sendKeys(neighborhood);
  }

  async getNeighborhoodInput() {
    return this.neighborhoodInput.getAttribute('value');
  }

  async setStratusInput(stratus) {
    await this.stratusInput.sendKeys(stratus);
  }

  async getStratusInput() {
    return this.stratusInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setRhInput(rh) {
    await this.rhInput.sendKeys(rh);
  }

  async getRhInput() {
    return this.rhInput.getAttribute('value');
  }

  getDiseaseInput() {
    return this.diseaseInput;
  }
  getDisabilityInput() {
    return this.disabilityInput;
  }
  async setRelationsInput(relations) {
    await this.relationsInput.sendKeys(relations);
  }

  async getRelationsInput() {
    return this.relationsInput.getAttribute('value');
  }

  async setStateCivilInput(stateCivil) {
    await this.stateCivilInput.sendKeys(stateCivil);
  }

  async getStateCivilInput() {
    return this.stateCivilInput.getAttribute('value');
  }

  async setProfessionInput(profession) {
    await this.professionInput.sendKeys(profession);
  }

  async getProfessionInput() {
    return this.professionInput.getAttribute('value');
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
