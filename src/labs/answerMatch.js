/**
 * Answer Matching Utility
 * Case-insensitive, whitespace-agnostic comparison supporting alternative answers
 * and dynamic simulation-state dependent values (e.g. dynamically assigned IPs).
 */

export const matchAnswer = (inputAnswer, flagDef, simState = {}) => {
  if (!flagDef) return false;
  const cleanInput = (inputAnswer || '').toString().trim().toLowerCase();
  if (!cleanInput) return false;

  const validAnswers = [
    ...(flagDef.answers || []),
    ...(flagDef.altAnswers || []),
    ...(flagDef.correctAnswers || [])
  ];

  // Dynamic state-dependent values
  if (flagDef.id === 'lab5-flag1' || flagDef.checkId === 'check_launch_web_vm') {
    const web = simState.instances?.find((i) => i.name === 'qm-web-01');
    if (web?.privateIp) validAnswers.push(web.privateIp, `${web.privateIp}/24`);
  }

  if (flagDef.id === 'lab5-flag2' || flagDef.checkId === 'check_launch_db_vm') {
    const db = simState.instances?.find((i) => i.name === 'qm-db-01');
    if (db?.privateIp) validAnswers.push(db.privateIp, `${db.privateIp}/24`);
  }

  if (flagDef.id === 'lab6-flag1' || flagDef.checkId === 'check_associate_fip') {
    const fip = simState.floatingIps?.[0];
    if (fip?.ip) validAnswers.push(fip.ip, `${fip.ip}/24`);
  }

  return validAnswers.some(
    (valid) => String(valid).toLowerCase().trim() === cleanInput
  );
};

export default matchAnswer;
