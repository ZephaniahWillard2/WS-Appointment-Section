import React, { useState, useEffect, useContext } from 'react';
import FeatherIcons from 'feather-icons-react';
// import { useAuth0 } from 'react-auth0-wrapper';
// import { generateUUID } from 'utils/generateUUID';
// import useUpdateAppointmentTypeApi from '../../../AppointmentType/useUpdateAppointmentTypeApi';
// import { useTenantDataContext } from '../../../../hooks/useGetTenantFromUser';
// import {
//   UserUsageContext,
//   UserUsageDispatchContext,
// } from '../../../../context/UserUsageContext';

export const CloneToCheck = ({ success, width, height, style = {} }) => {
  return (
    <span style={{ position: 'relative', width, height, ...style }}>
      <FeatherIcons
      // !!!!!    Changed Icon
        icon={'plus-square'}
        as={'button'}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width,
          height,
          ...(success ? { opacity: 0 } : { transition: '.25s' }),
        }}
      />
      <FeatherIcons
        icon={success ? 'check' : 'copy'}
        className={success ? 'text-success' : ''}
        as={'button'}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width,
          height,
          ...(success ? { transition: '.25s' } : { opacity: 0 }),
        }}
      />
    </span>
  );
};

const CloneAppointmentType = ({
  cloneObjectId,
  cloneObjectName,
  text,
  style = {},
  className = '',
  ...props
}) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 14000);
    }
  }, [copied]);

//   const { user } = useAuth0();
//   const { setReloadTenantData } = useTenantDataContext();
//   const { createAppointmentType } = useUpdateAppointmentTypeApi();

//   // Check for usage limits
//   const { limits, usage } = useContext(UserUsageContext);
//   const { appointmentTypeMax, groupClassMax } = limits || {};
//   const { appointmentTypeCount, groupClassCount } = usage || {};
//   const isAppointmentTypesMaxedOut = checkIfMaxedOut(
//     appointmentTypeCount,
//     appointmentTypeMax,
//   );
//   const isGroupClassTypesMaxedOut = checkIfMaxedOut(
//     groupClassCount,
//     groupClassMax,
//   );

//   // Upgrade modal (if applicable)
//   const { showUpgradeModal } = useContext(UserUsageDispatchContext);

//   const handleClone = e => {
//     // Add plan limit check
//     if (isAppointmentTypesMaxedOut) {
//       showUpgradeModal('Upgrade now to add more Appointment Types.');
//     } else {
//       setCopied(true);

//       // Server/Api update
//       createAppointmentType({
//         appointmentTypeObj: {
//           cloneId: cloneObjectId,
//           internalId: generateUUID(),
//           tenantId: user['https://wesparkle.biz/sparkleTenantId'],
//         },
//         onCompletedSuccessfullyCallback: () => setReloadTenantData(true),
//       });
//     }

//     e.stopPropagation();
//   };

  return (
    <button
      onClick={console.log()}
      {...props}
      type={'button'}
      className={`flex-c-c ${className}`}
      style={{ gap: 5, whiteSpace: 'nowrap', ...style }}
    >
      <CloneToCheck
        success={copied}
        width={'1.3em'}
        height={'1.3em'}
        style={{ display: 'inline-block' }}
      />
      {copied ? (
        <span className="text-success">{cloneObjectName} Cloned!</span>
      ) : (
        text
      )}
    </button>
  );
};

export default CloneAppointmentType;

function checkIfMaxedOut(usage, max) {
  if (!max && max !== 0) {
    return false;
  }

  return usage >= max;
}