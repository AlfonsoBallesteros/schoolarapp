import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ReferenceComponentsPage, { ReferenceDeleteDialog } from './reference.page-object';
import ReferenceUpdatePage from './reference-update.page-object';
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

describe('Reference e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let referenceComponentsPage: ReferenceComponentsPage;
  let referenceUpdatePage: ReferenceUpdatePage;
  let referenceDeleteDialog: ReferenceDeleteDialog;
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

  it('should load References', async () => {
    await navBarPage.getEntityPage('reference');
    referenceComponentsPage = new ReferenceComponentsPage();
    expect(await referenceComponentsPage.title.getText()).to.match(/References/);

    expect(await referenceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([referenceComponentsPage.noRecords, referenceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(referenceComponentsPage.noRecords)) ? 0 : await getRecordsCount(referenceComponentsPage.table);
  });

  it('should load create Reference page', async () => {
    await referenceComponentsPage.createButton.click();
    referenceUpdatePage = new ReferenceUpdatePage();
    expect(await referenceUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Reference/);
    await referenceUpdatePage.cancel();
  });

  it('should create and save References', async () => {
    await referenceComponentsPage.createButton.click();
    await referenceUpdatePage.setNameInput('name');
    expect(await referenceUpdatePage.getNameInput()).to.match(/name/);
    await referenceUpdatePage.setValueInput('value');
    expect(await referenceUpdatePage.getValueInput()).to.match(/value/);
    await referenceUpdatePage.stateSelectLastOption();
    await waitUntilDisplayed(referenceUpdatePage.saveButton);
    await referenceUpdatePage.save();
    await waitUntilHidden(referenceUpdatePage.saveButton);
    expect(await isVisible(referenceUpdatePage.saveButton)).to.be.false;

    expect(await referenceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(referenceComponentsPage.table);

    await waitUntilCount(referenceComponentsPage.records, beforeRecordsCount + 1);
    expect(await referenceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Reference', async () => {
    const deleteButton = referenceComponentsPage.getDeleteButton(referenceComponentsPage.records.last());
    await click(deleteButton);

    referenceDeleteDialog = new ReferenceDeleteDialog();
    await waitUntilDisplayed(referenceDeleteDialog.deleteModal);
    expect(await referenceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/schoolarappApp.reference.delete.question/);
    await referenceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(referenceDeleteDialog.deleteModal);

    expect(await isVisible(referenceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([referenceComponentsPage.noRecords, referenceComponentsPage.table]);

    const afterCount = (await isVisible(referenceComponentsPage.noRecords)) ? 0 : await getRecordsCount(referenceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
