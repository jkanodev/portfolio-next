"use client";

export default function RecallTrainerTablet() {
  return (
    <div className="recall-trainer-tablet">
      <div className="recall-trainer-tablet__frame">
        <div className="recall-trainer-tablet__screen">
          <iframe
            src="/recall-trainer/"
            title="Recall Trainer"
            className="recall-trainer-tablet__iframe"
          />
        </div>
        <div className="recall-trainer-tablet__home" aria-hidden />
      </div>
    </div>
  );
}
