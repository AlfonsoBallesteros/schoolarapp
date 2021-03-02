import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TypeComponentsPage, { TypeDeleteDialog } from './type.page-object';
import TypeUpdatePage from './type-update.page-object';
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

describe('Type e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let typeComponentsPage: TypeComponentsPage;
  let typeUpdatePage: TypeUpdatePage;
  let typeDeleteDialog: TypeDeleteDialog;
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

  it('should load Types', async () => {
    await navBarPage.getEntityPage('type');
    typeComponentsPage = new TypeComponentsPage();
    expect(await typeComponentsPage.title.getText()).to.match(/Types/);

    expect(await typeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([typeComponentsPage.noRecords, typeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(typeComponentsPage.noRecords)) ? 0 : await getRecordsCount(typeComponentsPage.table);
  });

  it('should load create Type page', async () => {
    await typeComponentsPage.createButton.click();
    typeUpdatePage = new TypeUpdatePage();
    expect(await typeUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Type/);
    await typeUpdatePage.cancel();
  });

  it('should create and save Types', async () => {
    await typeComponentsPage.createButton.click();
    await typeUpdatePage.setCodeInput('code');
    expect(await typeUpdatePage.getCodeInput()).to.match(/code/);
    await typeUpdatePage.setNameInput('name');
    expect(await typeUpdatePage.getNameInput()).to.match(/name/);
    await typeUpdatePage.setValueInput('value');
    expect(await typeUpdatePage.getValueInput()).to.match(/value/);
    await typeUpdatePage.setParentInput('parent');
    expect(await typeUpdatePage.getParentInput()).to.match(/parent/);
    await typeUpdatePage.stateSelectLastOption();
    await typeUpdatePage.referenceSelectLastOption();
    await waitUntilDisplayed(typeUpdatePage.saveButton);
    await typeUpdatePage.save();
    await waitUntilHidden(typeUpdatePage.saveButton);
    expect(await isVisible(typeUpdatePage.saveButton)).to.be.false;

    expect(await typeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(typeComponentsPage.table);

    await waitUntilCount(typeComponentsPage.records, beforeRecordsCount + 1);
    expect(await typeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Type', async () => {
    const deleteButton = typeComponentsPage.getDeleteButton(typeComponentsPage.records.last());
    await click(deleteButton);

    typeDeleteDialog = new TypeDeleteDialog();
    await waitUntilDisplayed(typeDeleteDialog.deleteModal);
    expect(await typeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/schoolarappApp.type.delete.question/);
    await typeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(typeDeleteDialog.deleteModal);

    expect(await isVisible(typeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([typeComponentsPage.noRecords, typeComponentsPage.table]);

    const afterCount = (await isVisible(typeComponentsPage.noRecords)) ? 0 : await getRecordsCount(typeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
