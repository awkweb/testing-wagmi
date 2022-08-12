import { expect, test } from '@playwright/test'

test('Send tip', async ({ page }) => {
  await page.goto(process.env.PLAYWRIGHT_URL as string)

  const sendTipButton = page.locator('button', { hasText: /send/i })
  await expect(sendTipButton).not.toBeEnabled()

  const connectButton = page.locator('button', { hasText: /mock/i })
  await expect(connectButton).toHaveText(/mock/i)
  await connectButton.click()

  await expect(sendTipButton).toBeEnabled()
  await sendTipButton.click()
  await expect(page.locator('text=Transaction')).toHaveText(
    'Transaction pending…',
  )

  await expect(page.locator('text=Transaction')).toHaveText(
    'Transaction confirmed!',
  )
})
