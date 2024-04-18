import { mergeTests } from '@playwright/test';
import { test as helpersFixture } from './helpers.fixture';
import { test as pageObjectsFixture } from './page-obects.fixture';

export const test = mergeTests(pageObjectsFixture, helpersFixture);
