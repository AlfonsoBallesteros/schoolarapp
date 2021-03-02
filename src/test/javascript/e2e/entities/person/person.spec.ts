import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PersonComponentsPage, { PersonDeleteDialog } from './person.page-object';
import PersonUpdatePage from './person-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible
} from '../../util/utils';

const expect = chai.expect;

describe('Person e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personComponentsPage: PersonComponentsPage;
  let personUpdatePage: PersonUpdatePage;
  let personDeleteDialog: PersonDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load People', async () => {
    await navBarPage.getEntityPage('person');
    personComponentsPage = new PersonComponentsPage();
    expect(await personComponentsPage.title.getText()).to.match(/People/);

    expect(await personComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([personComponentsPage.noRecords, personComponentsPage.table]);

    beforeRecordsCount = (await isVisible(personComponentsPage.noRecords)) ? 0 : await getRecordsCount(personComponentsPage.table);
  });

  it('should load create Person page', async () => {
    await personComponentsPage.createButton.click();
    personUpdatePage = new PersonUpdatePage();
    expect(await personUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Person/);
    await personUpdatePage.cancel();
  });

  it('should create and save People', async () => {
    await personComponentsPage.createButton.click();
    await personUpdatePage.setNameInput('name');
    expect(await personUpdatePage.getNameInput()).to.match(/name/);
    await personUpdatePage.setSurnameInput('surname');
    expect(await personUpdatePage.getSurnameInput()).to.match(/surname/);
    await personUpdatePage.setDocumentIdInput('documentId');
    expect(await personUpdatePage.getDocumentIdInput()).to.match(/documentId/);
    await personUpdatePage.setDocumentExpDateInput('01-01-2001');
    expect(await personUpdatePage.getDocumentExpDateInput()).to.eq('2001-01-01');
    await personUpdatePage.setPhoneNumberInput('phoneNumber');
    expect(await personUpdatePage.getPhoneNumberInput()).to.match(/phoneNumber/);
    await personUpdatePage.setTelephonNumberInput('telephonNumber');
    expect(await personUpdatePage.getTelephonNumberInput()).to.match(/telephonNumber/);
    await personUpdatePage.setBirthdateInput('01-01-2001');
    expect(await personUpdatePage.getBirthdateInput()).to.eq('2001-01-01');
    await personUpdatePage.setAddressInput('address');
    expect(await personUpdatePage.getAddressInput()).to.match(/address/);
    await personUpdatePage.setDistrictInput('district');
    expect(await personUpdatePage.getDistrictInput()).to.match(/district/);
    await personUpdatePage.setStratusInput('stratus');
    expect(await personUpdatePage.getStratusInput()).to.match(/stratus/);
    const selectedDisease = await personUpdatePage.getDiseaseInput().isSelected();
    if (selectedDisease) {
      await personUpdatePage.getDiseaseInput().click();
      expect(await personUpdatePage.getDiseaseInput().isSelected()).to.be.false;
    } else {
      await personUpdatePage.getDiseaseInput().click();
      expect(await personUpdatePage.getDiseaseInput().isSelected()).to.be.true;
    }
    const selectedDisability = await personUpdatePage.getDisabilityInput().isSelected();
    if (selectedDisability) {
      await personUpdatePage.getDisabilityInput().click();
      expect(await personUpdatePage.getDisabilityInput().isSelected()).to.be.false;
    } else {
      await personUpdatePage.getDisabilityInput().click();
      expect(await personUpdatePage.getDisabilityInput().isSelected()).to.be.true;
    }
    await personUpdatePage.setStateCivilInput('stateCivil');
    expect(await personUpdatePage.getStateCivilInput()).to.match(/stateCivil/);
    await personUpdatePage.setOcupationInput('ocupation');
    expect(await personUpdatePage.getOcupationInput()).to.match(/ocupation/);
    await personUpdatePage.setParentInput('parent');
    expect(await personUpdatePage.getParentInput()).to.match(/parent/);
    await personUpdatePage.stateSelectLastOption();
    await personUpdatePage.typeIdSelectLastOption();
    await personUpdatePage.genderSelectLastOption();
    await personUpdatePage.neighborhoodSelectLastOption();
    await personUpdatePage.citySelectLastOption();
    await personUpdatePage.birthplaceSelectLastOption();
    await personUpdatePage.nacionalitySelectLastOption();
    await personUpdatePage.cityExpSelectLastOption();
    await personUpdatePage.rhSelectLastOption();
    await personUpdatePage.epsSelectLastOption();
    await personUpdatePage.relationSelectLastOption();
    // personUpdatePage.coursesSelectLastOption();
    await waitUntilDisplayed(personUpdatePage.saveButton);
    await personUpdatePage.save();
    await waitUntilHidden(personUpdatePage.saveButton);
    expect(await isVisible(personUpdatePage.saveButton)).to.be.false;

    expect(await personComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(personComponentsPage.table);

    await waitUntilCount(personComponentsPage.records, beforeRecordsCount + 1);
    expect(await personComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Person', async () => {
    const deleteButton = personComponentsPage.getDeleteButton(personComponentsPage.records.last());
    await click(deleteButton);

    personDeleteDialog = new PersonDeleteDialog();
    await waitUntilDisplayed(personDeleteDialog.deleteModal);
    expect(await personDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/schoolarappApp.person.delete.question/);
    await personDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(personDeleteDialog.deleteModal);

    expect(await isVisible(personDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([personComponentsPage.noRecords, personComponentsPage.table]);

    const afterCount = (await isVisible(personComponentsPage.noRecords)) ? 0 : await getRecordsCount(personComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
