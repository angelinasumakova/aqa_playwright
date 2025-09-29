import { test, expect } from '@playwright/test';
import { setTimeout } from 'timers/promises';

test.beforeEach(async({ page }) => {
    await page.goto('/');
});

test.describe('Qauto tests', () => {
    // Positive scenario: Check that new user is successfully registered
    test('Registration of new user', async ({ page }) => {
        await page.getByRole('button', { name: 'Sign up' }).click();

        await expect(page.getByRole('heading', { name: 'Registration'})).toBeVisible();
        await page.fill('input[name="name"]', 'Third');
        await page.fill('input[name="lastName"]', 'User');
        await page.fill('input[name="email"]', 'aqa-ansu3@test.com');
        await page.fill('input[name="password"]', 'NewPassword1');
        await page.fill('input[name="repeatPassword"]','NewPassword1');

        await page.getByRole('button', { name: 'Register' }).click();

        await expect(page.getByRole('button', { name: 'Add car' })).toBeVisible();
    });

    // 1 Negative scenario: Check validation of Name field
    test('Validation of Name field', async ({ page }) => {
        let nameWithSpace = " Anhelina";
        let shortName = "B";
        let longName = "Therearemorethantwentycharacters";
        const inputNameField = page.locator('input[name="name"]');

        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.getByRole('heading', { name: 'Registration'})).toBeVisible();

        // Validation 1: Name is invalid if space is added
        await inputNameField.fill(nameWithSpace);
        await inputNameField.blur();
        await expect(page.getByText('Name is invalid')).toBeVisible();
        
        // Timeouts to see test results in video, w/o timeout it's impossible to see 
        // because actions are performed too fast
        await setTimeout(3000);
        inputNameField.clear();

        // Validation 2: Error is displayed if name field is empty
        await expect(page.getByText('Name required')).toBeVisible();
        await setTimeout(1000);

        // Validation 3: Name is passed if no space is added
        await inputNameField.fill(nameWithSpace.trim());
        await inputNameField.blur();
        await expect(page.getByText('Name is invalid')).not.toBeVisible();

        await setTimeout(3000);
        inputNameField.clear();
        await setTimeout(1000);

        // Validation 4: Error is displayed if name too short or too long
        await inputNameField.fill(shortName);
        await inputNameField.blur();
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
        await setTimeout(1000);
        inputNameField.clear();
        await inputNameField.fill(longName);
        await inputNameField.blur();
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    });

    // 2 Negative scenario: Check validation of Last Name field
    test('Validation of Last name field', async ({ page }) => {
        let lastNameWithSpace = " Sumakova";
        let shortLastName = "B";
        let longLastName = "Therearemorethantwentycharacters";
        const inputLastNameField = page.locator('input[name="lastName"]');

        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.getByRole('heading', { name: 'Registration'})).toBeVisible();

        // Validation 1: Last name is invalid if space is added
        await inputLastNameField.fill(lastNameWithSpace);
        await inputLastNameField.blur();
        await expect(page.getByText('Last name is invalid')).toBeVisible();
        
        // Timeouts to see test results in video, w/o timeout it's impossible to see 
        // because actions are performed too fast
        await setTimeout(3000);
        inputLastNameField.clear();

        // Validation 2: Error is displayed if last name field is empty
        await expect(page.getByText('Last name required')).toBeVisible();
        await setTimeout(1000);

        // Validation 3: Last name is passed if no space is added
        await inputLastNameField.fill(lastNameWithSpace.trim());
        await inputLastNameField.blur();
        await expect(page.getByText('Last name is invalid')).not.toBeVisible();

        await setTimeout(3000);
        inputLastNameField.clear();
        await setTimeout(1000);

        // Validation 4: Error is displayed if last name too short or too long
        await inputLastNameField.fill(shortLastName);
        await inputLastNameField.blur();
        await expect(page.getByText('Last name has to be from 2 to 20 characters long')).toBeVisible();
        await setTimeout(1000);
        inputLastNameField.clear();
        await inputLastNameField.fill(longLastName);
        await inputLastNameField.blur();
        await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible();
    });

    // 3 Negative scenario: Check validation of Email field
    test('Validation of Email field', async ({ page }) => {
        let email1 = "user123@gmailcom";
        let email2 = "@gmail.com";
        let email3 = "user123gmail.com";
        let emailWithSpace = " user123@gmail.com"
        const inputEmailField = page.locator('input[name="email"]');

        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.getByRole('heading', { name: 'Registration'})).toBeVisible();

        // Validation 1: Email is invalid with email1 data
        await inputEmailField.fill(email1);
        await inputEmailField.blur();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        
        // Timeouts to see test results in video, w/o timeout it's impossible to see 
        // because actions are performed too fast
        await setTimeout(1000);
        inputEmailField.clear();

        // Validation 2: Error is displayed if email field is empty
        await expect(page.getByText('Email required')).toBeVisible();
        await setTimeout(1000);

        // Validation 3: Email is invalid with email2 data
        await inputEmailField.fill(email2);
        await inputEmailField.blur();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        await setTimeout(1000);
        inputEmailField.clear();

        // Validation 4: Email is invalid with email3 data
        await inputEmailField.fill(email3);
        await inputEmailField.blur();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        await setTimeout(1000);
        inputEmailField.clear();

        // Validation 4: Email is invalid with email4 data
        await inputEmailField.fill(emailWithSpace);
        await inputEmailField.blur();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        await setTimeout(1000);
        inputEmailField.clear();

        // Validation 5: Email is passed with email4 data + trim()
        await inputEmailField.fill(emailWithSpace.trim());
        await inputEmailField.blur();
        await expect(page.getByText('Email is incorrect')).not.toBeVisible();
    });

    // 4 Negative scenario: Check validation of Password field
    test('Validation of Password field', async ({ page }) => {
        let password1 = "123";
        let password2 = "123fh6789";
        let password3 = "123Q4567nn9";
        const inputPasswordField = page.locator('input[name="password"]');

        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.getByRole('heading', { name: 'Registration'})).toBeVisible();

        // Validation 1: Password is invalid with password1 data
        await inputPasswordField.fill(password1);
        await inputPasswordField.blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        
        // Timeouts to see test results in video, w/o timeout it's impossible to see 
        // because actions are performed too fast
        await setTimeout(1000);
        inputPasswordField.clear();

        // Validation 2: Error is displayed if password field is empty
        await expect(page.getByText('Password required')).toBeVisible();
        await setTimeout(1000);

        // Validation 3: Password is invalid with password2 data
        await inputPasswordField.fill(password2);
        await inputPasswordField.blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).toBeVisible();
        await setTimeout(1000);
        inputPasswordField.clear();

        // Validation 4: Password is passed with password3 data
        await inputPasswordField.fill(password3);
        await inputPasswordField.blur();
        await expect(page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).not.toBeVisible();
    });

    // 5 Negative scenario: Check validation of Password + Re-enter Password fields
    test('Validation of Password and Re-enter Password fields', async ({ page }) => {
        let pass1 = "123Q4567nn9";
        let repass1 = "123Q4567nn0";
        let repass2 = "123Q4567nn9";
        const inputNewPasswordField = page.locator('input[name="password"]');
        const inputRepeatPasswordField = page.locator('input[name="repeatPassword"]');

        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.getByRole('heading', { name: 'Registration'})).toBeVisible();

        // Validation 1: Password and Re-enter Password do not match
        await inputNewPasswordField.fill(pass1);
        await inputNewPasswordField.blur();
        await inputRepeatPasswordField.fill(repass1);
        await inputRepeatPasswordField.blur();
        await expect(page.getByText('Passwords do not match')).toBeVisible();
        
        // Timeouts to see test results in video, w/o timeout it's impossible to see 
        // because actions are performed too fast
        await setTimeout(1000);
        inputRepeatPasswordField.clear();

        // Validation 2: Error is displayed if password field is empty
        await expect(page.getByText('Re-enter password required')).toBeVisible();
        await setTimeout(1000);

        // Validation 3: Password and Re-enter Password are passed
        await inputRepeatPasswordField.fill(repass2);
        await inputRepeatPasswordField.blur();
        await expect(page.getByText('Passwords do not match')).not.toBeVisible();
    });
});