// For drafts in Sanity Studio visual editor

import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const draft = await draftMode()
  draft.enable()

  return NextResponse.redirect(new URL('/', 'http://localhost:3000'))
}