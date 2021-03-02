import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EnrollmentComponentsPage, { EnrollmentDeleteDialog } from './enrollment.page-object';
import EnrollmentUpdatePage from './enrollment-update.page-object';
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

describe('Enrollment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let enrollmentComponentsPage: EnrollmentComponentsPage;
  let enrollmentUpdatePage: EnrollmentUpdatePage;
  let enrollmentDeleteDialog: EnrollmentDeleteDialog;
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

  it('should load Enrollments', async () => {
    await navBarPage.getEntityPage('enrollment');
    enrollmentComponentsPage = new EnrollmentComponentsPage();
    expect(await enrollmentComponentsPage.title.getText()).to.match(/Enrollments/);

    expect(await enrollmentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([enrollmentComponentsPage.noRecords, enrollmentComponentsPage.table]);

    beforeRecordsCount = (await isVisible(enrollmentComponentsPage.noRecords)) ? 0 : await getRecordsCount(enrollmentComponentsPage.table);
  });

  it('should load create Enrollment page', async () => {
    await enrollmentComponentsPage.createButton.click();
    enrollmentUpdatePage = new EnrollmentUpdatePage();
    expect(await enrollmentUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Enrollment/);
    await enrollmentUpdatePage.cancel();
  });

  it('should create and save Enrollments', async () => {
    await enrollmentComponentsPage.createButton.click();
    await enrollmentUpdatePage.setPeaceSafeFileInput('peaceSafeFile');
    expect(await enrollmentUpdatePage.getPeaceSafeFileInput()).to.match(/peaceSafeFile/);
    await enrollmentUpdatePage.setAcademicFileInput('academicFile');
    expect(await enrollmentUpdatePage.getAcademicFileInput()).to.match(/academicFile/);
    await enrollmentUpdatePage.setDocStudentFileInput('docStudentFile');
    expect(await enrollmentUpdatePage.getDocStudentFileInput()).to.match(/docStudentFile/);
    await enrollmentUpdatePage.setDocDadFileInput('docDadFile');
    expect(await enrollmentUpdatePage.getDocDadFileInput()).to.match(/docDadFile/);
    await enrollmentUpdatePage.setDocMomFileInput('docMomFile');
    expect(await enrollmentUpdatePage.getDocMomFileInput()).to.match(/docMomFile/);
    await enrollmentUpdatePage.setDocTutorFileInput('docTutorFile');
    expect(await enrollmentUpdatePage.getDocTutorFileInput()).to.match(/docTutorFile/);
    await enrollmentUpdatePage.setAcademicPeriodInput('academicPeriod');
    expect(await enrollmentUpdatePage.getAcademicPeriodInput()).to.match(/academicPeriod/);
    await enrollmentUpdatePage.setYearInput('year');
    expect(await enrollmentUpdatePage.getYearInput()).to.match(/year/);
    await enrollmentUpdatePage.setObsInput('obs');
    expect(await enrollmentUpdatePage.getObsInput()).to.match(/obs/);
    await enrollmentUpdatePage.setWorkingDayInput('workingDay');
    expect(await enrollmentUpdatePage.getWorkingDayInput()).to.match(/workingDay/);
    await enrollmentUpdatePage.setEnrollModalityInput('enrollModality');
    expect(await enrollmentUpdatePage.getEnrollModalityInput()).to.match(/enrollModality/);
    const selectedLegacy = await enrollmentUpdatePage.getLegacyInput().isSelected();
    if (selectedLegacy) {
      await enrollmentUpdatePage.getLegacyInput().click();
      expect(await enrollmentUpdatePage.getLegacyInput().isSelected()).to.be.false;
    } else {
      await enrollmentUpdatePage.getLegacyInput().click();
      expect(await enrollmentUpdatePage.getLegacyInput().isSelected()).to.be.true;
    }
    await enrollmentUpdatePage.stateSelectLastOption();
    await enrollmentUpdatePage.workShopSelectLastOption();
    await enrollmentUpdatePage.gradeProxSelectLastOption();
    await enrollmentUpdatePage.studentSelectLastOption();
    await waitUntilDisplayed(enrollmentUpdatePage.saveButton);
    await enrollmentUpdatePage.save();
    await waitUntilHidden(enrollmentUpdatePage.saveButton);
    expect(await isVisible(enrollmentUpdatePage.saveButton)).to.be.false;

    expect(await enrollmentComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(enrollmentComponentsPage.table);

    await waitUntilCount(enrollmentComponentsPage.records, beforeRecordsCount + 1);
    expect(await enrollmentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Enrollment', async () => {
    const deleteButton = enrollmentComponentsPage.getDeleteButton(enrollmentComponentsPage.records.last());
    await click(deleteButton);

    enrollmentDeleteDialog = new EnrollmentDeleteDialog();
    await waitUntilDisplayed(enrollmentDeleteDialog.deleteModal);
    expect(await enrollmentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/schoolarappApp.enrollment.delete.question/);
    await enrollmentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(enrollmentDeleteDialog.deleteModal);

    expect(await isVisible(enrollmentDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([enrollmentComponentsPage.noRecords, enrollmentComponentsPage.table]);

    const afterCount = (await isVisible(enrollmentComponentsPage.noRecords)) ? 0 : await getRecordsCount(enrollmentComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
