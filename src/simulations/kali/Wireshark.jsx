/**
 * Wireshark Packet Analyzer Simulation
 * CDAC Cloud Security Training Platform
 * Used in M1 Lab 2 to inspect training_capture.pcap and uncover plaintext credentials.
 */

import React, { useState } from 'react';
import { Maximize2, Minimize2, X, Filter, ArrowRight, Play, Square, RefreshCw } from 'lucide-react';

const PACKETS = [
  { no: 1, time: '0.000000', src: '192.168.1.105', dst: '1.1.1.1', proto: 'DNS', len: 78, info: 'Standard query 0x2a14 A internal-portal.local', method: null, stream: 0 },
  { no: 2, time: '0.012410', src: '1.1.1.1', dst: '192.168.1.105', proto: 'DNS', len: 94, info: 'Standard query response 0x2a14 A 192.168.1.50', method: null, stream: 0 },
  { no: 3, time: '0.015200', src: '192.168.1.105', dst: '192.168.1.50', proto: 'TCP', len: 66, info: '49210 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460', method: null, stream: 0 },
  { no: 4, time: '0.016100', src: '192.168.1.50', dst: '192.168.1.105', proto: 'TCP', len: 66, info: '80 → 49210 [SYN, ACK] Seq=0 Ack=1 Win=65160 Len=0', method: null, stream: 0 },
  { no: 5, time: '0.016300', src: '192.168.1.105', dst: '192.168.1.50', proto: 'TCP', len: 54, info: '49210 → 80 [ACK] Seq=1 Ack=1 Win=64240 Len=0', method: null, stream: 0 },
  { no: 6, time: '0.018220', src: '192.168.1.105', dst: '192.168.1.50', proto: 'HTTP', len: 320, info: 'GET /login.html HTTP/1.1', method: 'GET', stream: 0 },
  { no: 7, time: '0.024100', src: '192.168.1.50', dst: '192.168.1.105', proto: 'HTTP', len: 740, info: 'HTTP/1.1 200 OK (text/html)', method: null, stream: 0 },
  { no: 8, time: '0.098400', src: '192.168.1.105', dst: '192.168.1.50', proto: 'HTTP', len: 384, info: 'POST /login.php HTTP/1.1 (application/x-www-form-urlencoded)', method: 'POST', stream: 0 },
  { no: 9, time: '0.104200', src: '192.168.1.50', dst: '192.168.1.105', proto: 'HTTP', len: 198, info: 'HTTP/1.1 302 Found (text/html)', method: null, stream: 0 },
  { no: 10, time: '0.105500', src: '192.168.1.105', dst: '192.168.1.50', proto: 'TCP', len: 54, info: '49210 → 80 [FIN, ACK] Seq=331 Ack=343 Win=64240 Len=0', method: null, stream: 0 }
];

export default function Wireshark({
  onClose,
  onMaximize,
  isMaximized,
  recordLabEvent
}) {
  const [filterInput, setFilterInput] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [selectedPacketNo, setSelectedPacketNo] = useState(8);
  const [streamModalOpen, setStreamModalOpen] = useState(false);

  const handleApplyFilter = (e) => {
    e?.preventDefault();
    setActiveFilter(filterInput.trim());
    if (filterInput.toLowerCase().includes('post') && recordLabEvent) {
      recordLabEvent('wireshark_filtered_post');
    }
  };

  const handleClearFilter = () => {
    setFilterInput('');
    setActiveFilter('');
  };

  const handleFollowStream = () => {
    setStreamModalOpen(true);
    if (recordLabEvent) {
      recordLabEvent('wireshark_follow_stream');
    }
  };

  const filteredPackets = PACKETS.filter((p) => {
    if (!activeFilter) return true;
    const q = activeFilter.toLowerCase();
    if (q === 'http.request.method == "post"' || q === 'http.request.method == \'post\'' || q === 'post') {
      return p.method === 'POST';
    }
    if (q === 'http') {
      return p.proto === 'HTTP';
    }
    if (q === 'dns') {
      return p.proto === 'DNS';
    }
    if (q === 'tcp') {
      return p.proto === 'TCP';
    }
    return p.info.toLowerCase().includes(q) || p.proto.toLowerCase().includes(q);
  });

  const selectedPacket = PACKETS.find((p) => p.no === selectedPacketNo) || PACKETS[7];

  return (
    <div
      style={{
        position: 'absolute',
        inset: isMaximized ? 0 : '16px',
        backgroundColor: '#1e293b',
        borderRadius: isMaximized ? 0 : '10px',
        border: '1px solid #334155',
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
          height: '32px',
          backgroundColor: '#0f172a',
          color: '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          borderBottom: '1px solid #334155',
          fontSize: '11.5px',
          fontWeight: '700'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#38bdf8' }}>🦈</span>
          <span>Wireshark · [training_capture.pcap]</span>
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

      {/* Toolbar & Filter Bar */}
      <div
        style={{
          padding: '6px 12px',
          backgroundColor: '#0f172a',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={handleFollowStream}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Follow TCP Stream
          </button>
        </div>

        {/* Display Filter Input */}
        <form onSubmit={handleApplyFilter} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700' }}>Filter:</span>
          <input
            type="text"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            placeholder='e.g. http.request.method == "POST"'
            style={{
              flex: 1,
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: '#020617',
              border: '1px solid #334155',
              color: '#f8fafc',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Apply
          </button>
          {activeFilter && (
            <button
              type="button"
              onClick={handleClearFilter}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: '#334155',
                color: '#cbd5e1',
                fontSize: '11px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Packet Table Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '45px 75px 120px 120px 65px 60px 1fr',
          backgroundColor: '#090d16',
          color: '#94a3b8',
          fontSize: '11px',
          fontWeight: '700',
          padding: '6px 12px',
          borderBottom: '1px solid #334155'
        }}
      >
        <div>No.</div>
        <div>Time</div>
        <div>Source</div>
        <div>Destination</div>
        <div>Protocol</div>
        <div>Length</div>
        <div>Info</div>
      </div>

      {/* Packet List */}
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#020617', userSelect: 'text' }}>
        {filteredPackets.map((pkt) => {
          const isSelected = selectedPacketNo === pkt.no;
          const isHttp = pkt.proto === 'HTTP';
          const isDns = pkt.proto === 'DNS';

          let bg = isSelected ? '#1e3a8a' : (isHttp ? '#052e16' : (isDns ? '#172554' : 'transparent'));
          let textColor = isSelected ? '#ffffff' : (isHttp ? '#86efac' : (isDns ? '#93c5fd' : '#cbd5e1'));

          return (
            <div
              key={pkt.no}
              onClick={() => setSelectedPacketNo(pkt.no)}
              onDoubleClick={handleFollowStream}
              style={{
                display: 'grid',
                gridTemplateColumns: '45px 75px 120px 120px 65px 60px 1fr',
                padding: '4px 12px',
                fontSize: '11.5px',
                fontFamily: 'monospace',
                backgroundColor: bg,
                color: textColor,
                borderBottom: '1px solid #0f172a',
                cursor: 'pointer'
              }}
            >
              <div>{pkt.no}</div>
              <div>{pkt.time}</div>
              <div>{pkt.src}</div>
              <div>{pkt.dst}</div>
              <div style={{ fontWeight: '700' }}>{pkt.proto}</div>
              <div>{pkt.len}</div>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pkt.info}</div>
            </div>
          );
        })}
      </div>

      {/* Packet Details Bottom Pane */}
      <div
        style={{
          height: '110px',
          borderTop: '2px solid #334155',
          backgroundColor: '#0f172a',
          padding: '8px 14px',
          color: '#cbd5e1',
          fontSize: '11.5px',
          fontFamily: 'monospace',
          overflowY: 'auto'
        }}
      >
        <div style={{ fontWeight: '800', color: '#38bdf8', marginBottom: '4px' }}>
          Frame {selectedPacket.no}: {selectedPacket.len} bytes on wire ({selectedPacket.len * 8} bits)
        </div>
        <div>• Ethernet II, Src: 02:42:c0:a8:01:69, Dst: 02:42:c0:a8:01:32</div>
        <div>• Internet Protocol Version 4, Src: {selectedPacket.src}, Dst: {selectedPacket.dst}</div>
        <div>• Transmission Control Protocol, Src Port: 49210, Dst Port: 80</div>
        {selectedPacket.proto === 'HTTP' && (
          <div style={{ color: '#4ade80' }}>
            • Hypertext Transfer Protocol ({selectedPacket.info})
          </div>
        )}
      </div>

      {/* Follow TCP Stream Modal Dialog */}
      {streamModalOpen && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 100
          }}
        >
          <div
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '8px',
              border: '1.5px solid #0284c7',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: '800',
                fontSize: '12px'
              }}
            >
              <span>Follow TCP Stream (tcp.stream eq 0)</span>
              <button
                type="button"
                onClick={() => setStreamModalOpen(false)}
                style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div
              style={{
                flex: 1,
                padding: '16px',
                backgroundColor: '#020617',
                color: '#f8fafc',
                fontSize: '12.5px',
                fontFamily: 'monospace',
                overflowY: 'auto',
                lineHeight: '1.6',
                userSelect: 'text'
              }}
            >
              {/* Client request (in red/orange) */}
              <div style={{ color: '#f87171' }}>
                POST /login.php HTTP/1.1<br />
                Host: internal-portal.local<br />
                User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0<br />
                Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8<br />
                Content-Type: application/x-www-form-urlencoded<br />
                Content-Length: 38<br />
                Connection: keep-alive<br />
                <br />
                <span style={{ backgroundColor: '#7f1d1d', padding: '2px 4px', borderRadius: '3px', fontWeight: '800' }}>
                  username=trainee&password=Winter2024!
                </span>
              </div>

              <div style={{ margin: '14px 0', borderTop: '1px dashed #334155' }} />

              {/* Server response (in blue) */}
              <div style={{ color: '#60a5fa' }}>
                HTTP/1.1 302 Found<br />
                Date: Wed, 21 Oct 2026 09:15:32 GMT<br />
                Server: Apache/2.4.52 (Ubuntu)<br />
                Location: /dashboard.php<br />
                Content-Length: 180<br />
                Content-Type: text/html; charset=UTF-8<br />
                <br />
                &lt;p&gt;Redirecting to dashboard...&lt;/p&gt;
              </div>
            </div>

            <div
              style={{
                padding: '10px 16px',
                backgroundColor: '#0f172a',
                borderTop: '1px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#94a3b8'
              }}
            >
              <span>Plaintext unencrypted HTTP stream intercepted</span>
              <button
                type="button"
                onClick={() => setStreamModalOpen(false)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  backgroundColor: '#334155',
                  color: '#ffffff',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
