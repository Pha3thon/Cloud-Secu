/**
 * NIST NVD & Security Scenario Browser
 * CDAC Cloud Security Training Platform
 * Used in M1 Lab 3 for CVE-2021-44228 CVSS lookup and Scenario Card analysis.
 */

import React, { useState } from 'react';
import { Maximize2, Minimize2, X, Search, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export default function NvdBrowser({
  onClose,
  onMaximize,
  isMaximized,
  recordLabEvent
}) {
  const [activeTab, setActiveTab] = useState('nvd'); // 'nvd' | 'scenarios'
  const [searchTerm, setSearchTerm] = useState('CVE-2021-44228');

  return (
    <div
      style={{
        position: 'absolute',
        inset: isMaximized ? 0 : '16px',
        backgroundColor: '#ffffff',
        borderRadius: isMaximized ? 0 : '10px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        overflow: 'hidden'
      }}
    >
      {/* Title Bar */}
      <div
        style={{
          height: '34px',
          backgroundColor: '#0f172a',
          color: '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          fontSize: '12px',
          fontWeight: '700'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={15} color="#38bdf8" />
          <span>Security Reference & NVD Vulnerability Browser</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={onMaximize}
            style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
          >
            {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Navigation Tabs & URL Bar */}
      <div
        style={{
          padding: '8px 14px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('nvd')}
            style={{
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              backgroundColor: activeTab === 'nvd' ? '#0284c7' : '#ffffff',
              color: activeTab === 'nvd' ? '#ffffff' : '#64748b',
              border: '1px solid',
              borderColor: activeTab === 'nvd' ? '#0284c7' : '#cbd5e1',
              cursor: 'pointer'
            }}
          >
            NIST NVD Lookup (Flag 2)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scenarios')}
            style={{
              padding: '5px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              backgroundColor: activeTab === 'scenarios' ? '#0284c7' : '#ffffff',
              color: activeTab === 'scenarios' ? '#ffffff' : '#64748b',
              border: '1px solid',
              borderColor: activeTab === 'scenarios' ? '#0284c7' : '#cbd5e1',
              cursor: 'pointer'
            }}
          >
            Scenario Cards (Flags 1 & 3)
          </button>
        </div>

        {activeTab === 'nvd' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', maxWidth: '300px', width: '100%' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search CVE ID..."
                style={{
                  width: '100%',
                  padding: '4px 8px 4px 26px',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  fontSize: '11.5px',
                  fontFamily: 'monospace'
                }}
              />
              <Search size={13} style={{ position: 'absolute', left: '8px', top: '7px', color: '#94a3b8' }} />
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', userSelect: 'text' }}>
        {activeTab === 'nvd' ? (
          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '12px' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase' }}>
                National Vulnerability Database · Official Release
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '4px 0 0 0' }}>
                CVE-2021-44228 Detail
              </h1>
            </div>

            {/* CVSS Score Hero */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: '16px',
                padding: '16px 20px',
                borderRadius: '8px',
                backgroundColor: '#fef2f2',
                border: '1.5px solid #fca5a5'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#991b1b' }}>
                  NVD CVSS v3.1 Base Score
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '32px', fontWeight: '900', color: '#dc2626' }}>
                    10.0
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff', backgroundColor: '#dc2626', padding: '2px 8px', borderRadius: '4px' }}>
                    CRITICAL
                  </span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#991b1b' }}>
                  Vector String
                </div>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#7f1d1d', marginTop: '6px', wordBreak: 'break-all' }}>
                  CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                  Network exploitable · Low complexity · Zero privileges required · Critical impact on Confidentiality, Integrity, and Availability
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Vulnerability Description
              </h2>
              <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.65', margin: 0, backgroundColor: '#f8fafc', padding: '14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                Apache Log4j2 versions 2.0-beta9 through 2.14.1 JNDI features used in configuration, log messages, and parameters do not protect against attacker-controlled LDAP and other JNDI-related endpoints. An attacker who can control log messages or log message parameters can execute arbitrary code loaded from LDAP servers when message lookup substitution is enabled.
              </p>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Flag 1 Cards */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#0284c7', marginBottom: '8px' }}>
                Flag 1 Reference: Incident Scenario Cards (CIA Triad)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '12.5px', marginBottom: '4px' }}>
                    Card A (Farhan, rogue contractor)
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                    Farhan, a rogue contractor, modifies a company's public price list without anyone noticing, so customers see wrong prices for two days.
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#0369a1', marginTop: '6px' }}>
                    Classification: Integrity (unauthorized tampering with trusted data)
                  </div>
                </div>

                <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '12.5px', marginBottom: '4px' }}>
                    Card B (Rohan, disheartened employee)
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                    Rohan, a disheartened employee, copies the customer database to a personal USB drive.
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#0369a1', marginTop: '6px' }}>
                    Classification: Confidentiality (unauthorized disclosure of sensitive records)
                  </div>
                </div>

                <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '12.5px', marginBottom: '4px' }}>
                    Card C (Dr. Asthana, hospital record system)
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                    A ransomware attack encrypts a hospital's patient record system, and Dr. Asthana cannot access patient files for six hours.
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#0369a1', marginTop: '6px' }}>
                    Classification: Availability (authorized medical staff blocked from accessing records)
                  </div>
                </div>
              </div>
            </div>

            {/* Flag 3 Cards */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#0d9488', marginBottom: '8px' }}>
                Flag 3 Reference: Assessment Scenario Cards (VA vs. PT)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f0fdf4' }}>
                  <div style={{ fontWeight: '800', color: '#166534', fontSize: '12.5px', marginBottom: '4px' }}>
                    Card X (Ananya and audit team)
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                    Ananya and her audit team ran an automated scanner against 500 servers and produced a report listing all outdated software versions found.
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', marginTop: '6px' }}>
                    Classification: Vulnerability Assessment (VA) — automated scanning without exploitation
                  </div>
                </div>

                <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fef2f2' }}>
                  <div style={{ fontWeight: '800', color: '#991b1b', fontSize: '12.5px', marginBottom: '4px' }}>
                    Card Y (Kabir, red team engagement)
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                    Kabir, during an authorized red team engagement, found a login form vulnerable to SQL injection, and successfully used it to extract the admin password hash to prove real impact.
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#dc2626', marginTop: '6px' }}>
                    Classification: Penetration Test (PT) — active authorized exploitation proving real impact
                  </div>
                </div>

                <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#f0fdf4' }}>
                  <div style={{ fontWeight: '800', color: '#166534', fontSize: '12.5px', marginBottom: '4px' }}>
                    Card Z (Meera, cloud posture check)
                  </div>
                  <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
                    Meera ran a cloud posture check and scanned the client's cloud storage buckets and flagged three that appeared publicly accessible, without accessing their contents.
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', marginTop: '6px' }}>
                    Classification: Vulnerability Assessment (VA) — passive configuration audit without downloading contents
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
