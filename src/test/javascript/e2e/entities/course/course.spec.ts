import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CourseComponentsPage, { CourseDeleteDialog } from './course.page-object';
import CourseUpdatePage from './course-update.page-object';
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

describe('Course e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let courseComponentsPage: CourseComponentsPage;
  let courseUpdatePage: CourseUpdatePage;
  let courseDeleteDialog: CourseDeleteDialog;
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

  it('should load Courses', async () => {
    await navBarPage.getEntityPage('course');
    courseComponentsPage = new CourseComponentsPage();
    expect(await courseComponentsPage.title.getText()).to.match(/Courses/);

    expect(await courseComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([courseComponentsPage.noRecords, courseComponentsPage.table]);

    beforeRecordsCount = (await isVisible(courseComponentsPage.noRecords)) ? 0 : await getRecordsCount(courseComponentsPage.table);
  });

  it('should load create Course page', async () => {
    await courseComponentsPage.createButton.click();
    courseUpdatePage = new CourseUpdatePage();
    expect(await courseUpdatePage.getPageTitle().getText()).to.match(/Create or edit a Course/);
    await courseUpdatePage.cancel();
  });

  it('should create and save Courses', async () => {
    await courseComponentsPage.createButton.click();
    await courseUpdatePage.setNameInput('name');
    expect(await courseUpdatePage.getNameInput()).to.match(/name/);
    await courseUpdatePage.setHourInput('hour');
    expect(await courseUpdatePage.getHourInput()).to.match(/hour/);
    await courseUpdatePage.setGradeInput('grade');
    expect(await courseUpdatePage.getGradeInput()).to.match(/grade/);
    await courseUpdatePage.teacherSelectLastOption();
    await waitUntilDisplayed(courseUpdatePage.saveButton);
    await courseUpdatePage.save();
    await waitUntilHidden(courseUpdatePage.saveButton);
    expect(await isVisible(courseUpdatePage.saveButton)).to.be.false;

    expect(await courseComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(courseComponentsPage.table);

    await waitUntilCount(courseComponentsPage.records, beforeRecordsCount + 1);
    expect(await courseComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Course', async () => {
    const deleteButton = courseComponentsPage.getDeleteButton(courseComponentsPage.records.last());
    await click(deleteButton);

    courseDeleteDialog = new CourseDeleteDialog();
    await waitUntilDisplayed(courseDeleteDialog.deleteModal);
    expect(await courseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/schoolarappApp.course.delete.question/);
    await courseDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(courseDeleteDialog.deleteModal);

    expect(await isVisible(courseDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([courseComponentsPage.noRecords, courseComponentsPage.table]);

    const afterCount = (await isVisible(courseComponentsPage.noRecords)) ? 0 : await getRecordsCount(courseComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
