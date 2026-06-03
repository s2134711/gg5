const careerState = {
  chapter: 1,
  draftStock: 62,
  reputation: 52,
  trust: 48,
  pressure: 41,
  archetype: "The Humble Leader",
};

const scenes = {
  leader: {
    phase: "Scout Favorite",
    archetype: "The Humble Leader",
    title: "Quiet Work, Loud Results",
    location: "Back field · Spring complex",
    copy:
      "You skip the viral clapback and ask for one more round of infield reps. A scouting director notices the routine, your agent gets a cleaner negotiation lane, and your family becomes the emotional anchor of draft night.",
    effects: { draftStock: 9, reputation: 12, trust: 10, pressure: -4 },
    reactions: [
      ["Scout", "That polish is rare for a teenager under this much attention."],
      ["Agent", "Clean interviews mean more rooms are willing to fight for you."],
      ["Mom", "That looked like the kid who fell in love with the game."],
    ],
  },
  flash: {
    phase: "Viral Prospect",
    archetype: "The Flashy Superstar",
    title: "The Clip Heard Around the League",
    location: "Hotel suite · Draft week",
    copy:
      "Your promise lights up social media before the scouts finish dinner. Sponsors start calling, one small-market club worries about distractions, and every batting-practice swing now feels like a trailer for your future.",
    effects: { draftStock: 13, reputation: 6, trust: -3, pressure: 12 },
    reactions: [
      ["Sponsor", "We can build a campaign around that confidence."],
      ["Veteran", "Talent gets you noticed. Habits keep you employed."],
      ["Reporter", "Is baseball ready for its next main character?"],
    ],
  },
  edge: {
    phase: "Rivalry Mode",
    archetype: "The Villain Fans Love",
    title: "A Rivalry Gets a Camera Crew",
    location: "Showcase diamond · National stream",
    copy:
      "You answer the rival and the whole showcase tilts toward drama. Some clubs love the competitive fire, others question the risk, and the next at-bat arrives with everyone in the park leaning forward.",
    effects: { draftStock: 5, reputation: -8, trust: 2, pressure: 18 },
    reactions: [
      ["Rival", "Finally. Bring that same energy in the box."],
      ["Agent", "We can sell edge, but we cannot sell chaos."],
      ["Fan Feed", "Must-watch prospect. No notes."],
    ],
  },
};

const clamp = (value) => Math.max(0, Math.min(100, value));

function reputationLabel(score) {
  if (score >= 70) return "Beloved";
  if (score >= 45) return "Balanced";
  if (score >= 25) return "Polarizing";
  return "Infamous";
}

function updateStat(id, value) {
  document.getElementById(id).textContent = value;
  document.getElementById(`${id === "draft-stock" ? "draft" : id}-meter`)?.setAttribute("value", value);
}

function applyChoice(choiceKey) {
  const scene = scenes[choiceKey];
  careerState.chapter += 1;
  careerState.draftStock = clamp(careerState.draftStock + scene.effects.draftStock);
  careerState.reputation = clamp(careerState.reputation + scene.effects.reputation);
  careerState.trust = clamp(careerState.trust + scene.effects.trust);
  careerState.pressure = clamp(careerState.pressure + scene.effects.pressure);
  careerState.archetype = scene.archetype;

  document.getElementById("phase-label").textContent = scene.phase;
  document.getElementById("player-archetype").textContent = scene.archetype;
  document.getElementById("legacy-copy").textContent =
    "Your choices are now shaping how clubs, fans, teammates, and family talk about your rise.";
  document.getElementById("chapter-tag").textContent = `Chapter ${careerState.chapter}`;
  document.getElementById("location").textContent = scene.location;
  document.getElementById("scene-title").textContent = scene.title;
  document.getElementById("scene-copy").textContent = scene.copy;

  updateStat("draft-stock", careerState.draftStock);
  document.getElementById("reputation").textContent = reputationLabel(careerState.reputation);
  document.getElementById("rep-meter").setAttribute("value", careerState.reputation);
  updateStat("trust", careerState.trust);
  updateStat("pressure", careerState.pressure);

  const feed = document.getElementById("reaction-feed");
  feed.innerHTML = scene.reactions
    .map(([speaker, quote]) => `<li><strong>${speaker}:</strong> “${quote}”</li>`)
    .join("");
}

document.querySelectorAll(".choice").forEach((button) => {
  button.addEventListener("click", () => applyChoice(button.dataset.choice));
});
