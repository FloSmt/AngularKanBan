import { test, expect } from '@playwright/test';
import {tick} from "@angular/core/testing";

test.describe('general', () =>{
  test('has title', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await expect(page).toHaveTitle("AngularKanban");
  });

  test('has Header title', async ({ page }) => {
    await page.goto('http://localhost:4200');
    const headline = await page.$('header');
    await expect(await headline?.$eval('h2', node => node.innerText)).toEqual("Kanban Board Projekt - Einstieg Angular");
  });
});

test.describe('Edit Menus', () => {
  test('open Priority-Edit-Menu', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await page.locator("header .editPriority").click();

    await expect(await page.locator('#editpriority').isVisible()).toBeTruthy();
  });

  test('open Priority-Edit-Menu in Card-Menu', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await page.locator("app-status-column .cards .card").nth(0).click();

    await page.locator(".priority").click();
    await page.locator(".options .edit").click();

    await expect(await page.locator('#editpriority').isVisible()).toBeTruthy();
  });

  test('open Status-Edit-Menu', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await page.locator("app-status-column .title").nth(0).click();

    await expect(await page.locator('#status-edit-window-0').isVisible()).toBeTruthy();
  });

  test('open Card-Edit-Menu', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await page.locator("app-status-column .cards .card").nth(0).click();

    await expect(await page.locator('#modalElement').isVisible()).toBeTruthy();
  });
})
