import React from 'react';
import { CreateNetwork } from './wizards/CreateNetwork';
import { CreateRouter, AddInterface } from './wizards/CreateRouter';
import { LaunchInstance, CreateKeypair } from './wizards/LaunchInstance';
import { CreateSecurityGroup, AddRule } from './wizards/AddRule';
import { AllocateFloatingIp, ManageAssociations } from './wizards/ManageAssociations';
import SimErrorBoundary from '@/components/common/SimErrorBoundary';

/**
 * HorizonModals: Renders open creation wizard and modal dialogs for OpenStack Horizon.
 * Wrapped with SimErrorBoundary to contain exceptions cleanly.
 */
export default function HorizonModals({
  modalOpen,
  setModalOpen,
  targetSgForRule,
  setTargetSgForRule,
  targetFipForAssociate,
  setTargetFipForAssociate,
  simCloud,
  updateSimCloud,
  showToast
}) {
  if (!modalOpen) return null;

  return (
    <SimErrorBoundary onClose={() => setModalOpen(null)}>
      {modalOpen === 'create_net' && (
        <CreateNetwork
          onClose={() => setModalOpen(null)}
          onSave={(net) => {
            updateSimCloud((prev) => ({ networks: [...prev.networks.filter((n) => n.name !== net.name), net] }));
            setModalOpen(null);
            showToast(`Network '${net.name}' created.`);
          }}
        />
      )}

      {modalOpen === 'create_router' && (
        <CreateRouter
          onClose={() => setModalOpen(null)}
          onSave={(router) => {
            updateSimCloud((prev) => ({ routers: [...prev.routers.filter((r) => r.name !== router.name), router] }));
            setModalOpen(null);
            showToast(`Router '${router.name}' created.`);
          }}
        />
      )}

      {modalOpen === 'add_interface' && (
        <AddInterface
          onClose={() => setModalOpen(null)}
          onSave={(subnet) => {
            updateSimCloud((prev) => ({
              routers: (prev.routers || []).map((r) => r.name === 'qm-router' ? { ...r, interfaces: [...(r.interfaces || []).filter((i) => i !== subnet), subnet] } : r)
            }));
            setModalOpen(null);
            showToast(`Interface for '${subnet}' added to qm-router.`);
          }}
        />
      )}

      {modalOpen === 'create_key' && (
        <CreateKeypair
          onClose={() => setModalOpen(null)}
          onSave={(keyName) => {
            updateSimCloud((prev) => ({
              keyPairs: [...prev.keyPairs.filter((k) => k.name !== keyName), { name: keyName }],
              kaliFiles: { ...prev.kaliFiles, downloads: [...(prev.kaliFiles?.downloads || []).filter((f) => f !== `${keyName}.pem`), `${keyName}.pem`] }
            }));
            setModalOpen(null);
            showToast(`Key Pair '${keyName}' created. Downloaded to Kali.`);
          }}
        />
      )}

      {modalOpen === 'launch_vm' && (
        <LaunchInstance
          onClose={() => setModalOpen(null)}
          onLaunch={(vm) => {
            updateSimCloud((prev) => ({ instances: [...prev.instances.filter((i) => i.name !== vm.name), vm] }));
            setModalOpen(null);
            showToast(`Instance '${vm.name}' launched.`);
          }}
        />
      )}

      {modalOpen === 'create_sg' && (
        <CreateSecurityGroup
          onClose={() => setModalOpen(null)}
          onSave={(sg) => {
            updateSimCloud((prev) => ({ securityGroups: [...prev.securityGroups.filter((s) => s.name !== sg.name), sg] }));
            setModalOpen(null);
            showToast(`Security group '${sg.name}' created.`);
          }}
        />
      )}

      {modalOpen === 'add_rule' && targetSgForRule && (
        <AddRule
          targetSg={targetSgForRule}
          onClose={() => { setModalOpen(null); setTargetSgForRule(null); }}
          onSave={(rule) => {
            updateSimCloud((prev) => ({
              securityGroups: (prev.securityGroups || []).map((s) => s.name === targetSgForRule.name ? { ...s, rules: [...(s.rules || []), rule] } : s)
            }));
            setModalOpen(null);
            setTargetSgForRule(null);
            showToast(`Rule added to ${targetSgForRule.name}.`);
          }}
        />
      )}

      {modalOpen === 'allocate_fip' && (
        <AllocateFloatingIp
          onClose={() => setModalOpen(null)}
          onAllocate={(fip) => {
            updateSimCloud((prev) => ({ floatingIps: [...prev.floatingIps.filter((f) => f.ip !== fip.ip), fip] }));
            setModalOpen(null);
            showToast(`Floating IP ${fip.ip} allocated.`);
          }}
        />
      )}

      {modalOpen === 'associate_fip' && targetFipForAssociate && (
        <ManageAssociations
          targetFip={targetFipForAssociate}
          instances={simCloud.instances || []}
          onClose={() => { setModalOpen(null); setTargetFipForAssociate(null); }}
          onAssociate={(fip, mapping) => {
            updateSimCloud((prev) => ({
              floatingIps: (prev.floatingIps || []).map((f) => f.ip === fip.ip ? { ...f, ...mapping } : f)
            }));
            setModalOpen(null);
            setTargetFipForAssociate(null);
            showToast(`Floating IP ${fip.ip} associated.`);
          }}
        />
      )}
    </SimErrorBoundary>
  );
}
