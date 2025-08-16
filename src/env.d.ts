/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    auth?: {
      isAuthenticated: boolean
      user?: {
        username: string
      }
    }
    error?: string
  }
}