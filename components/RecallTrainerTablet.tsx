'use client'

import { useEffect, useState } from 'react'

export default function RecallTrainerTablet() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="tabletWrap">
      <div className="tabletTopBar">
        <div className="tabletCam" />
        <div className="tabletTitle">Recall Trainer</div>
        <a
          className="tabletOpen"
          href="/recall-trainer/index.html"
          target="_blank"
          rel="noreferrer"
        >
          Open
        </a>
      </div>

      <div className="tabletScreen">
        <iframe
          src="/recall-trainer/index.html"
          title="Recall Trainer"
          className="tabletFrame"
        />
      </div>

      <div className="tabletFooter">
        Every topic must be learned in this order:
        What it is, Why it exists, How it works,
        Where it runs, One real example
      </div>
    </div>
  )
}
