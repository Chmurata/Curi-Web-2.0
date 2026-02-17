import { useState } from 'react';
import CircularCycleDiagram from './CircularCycleDiagram';
import FlywheelRelay from './FlywheelRelay';
import FlywheelHelix from './FlywheelHelix';
import FlywheelStickyHub from './FlywheelStickyHub';

const CONCEPTS = {
  original: { label: 'Original (Circular Wheel)', component: CircularCycleDiagram },
  relay: { label: 'Concept 1: The Relay', component: FlywheelRelay },
  helix: { label: 'Concept 2: The DNA Helix', component: FlywheelHelix },
  stickyHub: { label: 'Concept 3: The Sticky Hub', component: FlywheelStickyHub },
} as const;

type ConceptKey = keyof typeof CONCEPTS;

export function FlywheelSection() {
  const [activeConcept, setActiveConcept] = useState<ConceptKey>('original');
  const ActiveComponent = CONCEPTS[activeConcept].component;

  return (
    <section className="relative">
      {/* Temporary Concept Switcher */}
      <div className="sticky top-4 z-50 flex justify-center mb-4">
        <select
          value={activeConcept}
          onChange={(e) => setActiveConcept(e.target.value as ConceptKey)}
          className="px-4 py-2 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
        >
          {Object.entries(CONCEPTS).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Active Concept */}
      <div className="w-full">
        <ActiveComponent />
      </div>
    </section>
  );
}
