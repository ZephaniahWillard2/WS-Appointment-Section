import React, { memo, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import moment from 'moment';
// import { useAuth0 } from 'react-auth0-wrapper';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
// import {
//   SPARKLE_API_CODE,
//   SPARKLE_API_PATH,
//   SPARKLE_PATH,
//   SPARKLE_SITE_PATH,
// } from '../../../utils/constants';
import {
  BtnRemove,
  EmptySection,
  Section,
  SectionListItem,
} from "./PageElements";
import FeatherIcon from 'feather-icons-react';
import CopyText from "./CopyText";
// import { MINUTE_HOUR_DURATION_OPTIONS } from '../../Form/Option';
// import useUpdateAppointmentTypeApi from '../../AppointmentType/useUpdateAppointmentTypeApi';
import { Link } from 'react-router-dom';
// import {
//   UserUsageContext,
//   UserUsageDispatchContext,
// } from '../../../context/UserUsageContext';
import IconLoaderCircle from './IconLoaderCircle';
// import { useAuthApiConfig } from '../../../hooks/useAuthApiConfig';
import CloneAppointmentType from './Clone';
import FeatherIcons from 'feather-icons-react';
import EmbedCodeButton from './EmbedCodeButton';


const MINUTE_HOUR_DURATION_OPTIONS = ['hours', 'minutes'];

const SPARKLE_PATH = 'http://localhost:3001/';


const ApptItem = ({
  id,
  projectId,
  apptKey,
  name,
  length,
  lengthType,
  order,
  copyText,
  draggable,
  onDragOver,
  onDragStart,
  onDrop,
  lastItem,
  onSave,
  onRemove,
  onEdit,
  isGroupClass,
  tenantId,
  // upcomingBookings,
  ...props
}) => {
  // item state (for easy rollback/undo)

  const [titleValue, setTitle] = useState(name);
  const [titleFocus, setTitleFocus] = useState(false);
  const [durationAmountValue, setDurationAmountValue] = useState(length);
  const [durationAmountFocus, setDurationAmountFocus] = useState(false);
  const [durationTypeValue, setDurationTypeValue] = useState(lengthType);
  const [durationTypeFocus, setDurationTypeFocus] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  // Upcoming bookings state
  // const futureMonth = moment()
  //   .add(12, 'M')
  //   .format('MM-DD-YYYY');
  const [refreshUpcoming, setRefreshUpcoming] = useState(false);
  const [groupClassInstances, setGroupClassInstances] = useState([]);
  // const config = useAuthApiConfig();
  // const api = axios.create({ baseURL: SPARKLE_API_PATH });

  // useEffect(() => {
  //   if (isGroupClass && (projectId || refreshUpcoming) && config) {
  //     api
  //       .post(
  //         `ListBookings?code=${SPARKLE_API_CODE}`,
  //         {
  //           tenantId,
  //           projectId,
  //           endDate: futureMonth,
  //         },
  //         config,
  //       )
  //       .then(response => {
  //         if (response.data) {
  //           const upcoming = getUpcomingBookingsForAppointmentType(
  //             response.data,
  //             projectId,
  //           );
  //           setGroupClassInstances(upcoming || []);
  //         }
  //       })
  //       .finally(() => {
  //         setRefreshUpcoming(false);
  //       });
  //   }
  // }, [projectId, refreshUpcoming, config]);

  useEffect(() => {
    if (titleValue !== name) {
      setTitle(name);
    }
    if (durationAmountValue !== length) {
      setDurationAmountValue(length);
    }
    if (durationTypeValue !== lengthType) {
      setDurationTypeValue(lengthType);
    }
  }, [name, length, lengthType]);

  // Clicks are so that losing focus doesn't close items right away
  const [clickedRemove, setClickedRemove] = useState(false);
  const [clickedSave, setClickedSave] = useState(false);

  // Has changes? (display or hide save/undo buttons)
  const inputChanged =
    titleValue !== name ||
    durationAmountValue !== length ||
    durationTypeValue !== lengthType;

  // If editing
  // - Focused on inputs
  // - If edit is 'on' (ie adding a new Link)
  // - On pointer down of delete + save actions to avoid focus glitches
  const editing =
    inputChanged ||
    titleFocus ||
    durationAmountFocus ||
    durationTypeFocus ||
    clickedRemove ||
    clickedSave;




//!!!!!!!!      Trying to add a dropdown menu for CopyLink btn      !!!!!!!!!

// Toggle dropdown visibility
const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

// Close dropdown if clicking outside
const closeDropdown = (event) => {
  if (!event.target.closest('.dropbtn')) {
    setIsDropdownOpen(false);
  }
};

useEffect(() => {
  window.addEventListener('click', closeDropdown);
  return () => {
    window.removeEventListener('click', closeDropdown);
  };
}, []);



// !!!!!      Added in CopyToCheck function here, from CopyText to change position of Copy Link Btn. Maybe not needed anymore.
const CopyToCheck = ({ success, width, height, style = {} }) => {
  return (
    <span style={{ position: 'relative', width, height, ...style }}>
      <FeatherIcons
      // !!!!!     Changed icon, possibly making it so that the "Copy Link" btn and the chevron-down are two separate btns.
        icon={'chevron-down'}
        as={'button'}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width,
          height,
          // color:'#495057',
          // border:'solid thin #495057',
          // borderRadius:'0.15rem',
          // color:'#007bff',
          // borderRight: 'solid',
          // paddingRight:'5px',
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




  return (
    <SectionListItem
      id={id}
      order={order}
      draggable={
        draggable &&
        !editing &&
        !titleFocus &&
        !durationAmountFocus &&
        !clickedRemove &&
        !clickedSave
      }
      lastItem={lastItem}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      onDrop={onDrop}
      {...props}
      actions={

        // !!!!!!!      Edited Code: working on making btn actions into a drop-down menu       !!!!!!!
        <>
          <>
            {!editing && projectId !== undefined && (

                <>
                  {!isGroupClass && (
                    <CloneAppointmentType
                      cloneObjectId={id}
                      cloneObjectName={titleValue}
                      text={'Clone'}
                      className="btn round pl-0 pr-2 btn-sm"
                      style={{ marginRight: 20, fontWeight: 'bold', display:"flex", letterSpacing:'.7px', border:'1px solid #d2d2d2', padding:'0.5em', borderRadius:'0.25rem'  }}
                    />
                  )}
                </>
                )}
          </>
          {/* !!!!!     Added/Changed elements to Copy Link btn */}
          <div className='dropdown'>
            <button onClick={toggleDropdown} className='dropbtn' style={{ marginRight: 10, fontWeight: 'bold',  height:'32.66px', border: '1px solid #d2d2d2', padding: '0.5em', borderRadius: '0.25rem' }}>
              <CopyToCheck
              id='copyLinkHover'
                width={'1.3em'}
                height={'1.3em'}
                marginRight={'4em'}
                style={{ display: 'inline-block', marginRight:'.5em' }}
              /> Copy Link
            </button>
            <div id="myDropdown" className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
              {!editing && projectId !== undefined && (
                <>
                  <CopyText
                    copyText={copyText}
                    text={'Copy Link'}
                    className="btn round px-0 btn-sm"
                    style={{ marginRight: 10, padding: '0.5em' }}
                  />
                </>
              )}
              <button style={{padding:'.5em',  marginRight: 10}}>Get Embed Code</button>
            </div>
          </div>
        </>
                  //!!!!!!!!!     Original Code! Editing above code to try and move the "Copy Link" button.
                  // <>
                  //   {!editing && projectId !== undefined && (
                  //     <>
                  //       {!isGroupClass && (
                  //         <CloneAppointmentType
                  //           cloneObjectId={id}
                  //           cloneObjectName={titleValue}
                  //           text={'Duplicate'}
                  //           className="btn round pl-0 pr-2 btn-sm"
                  //           style={{ marginRight: 20, fontWeight: 'bold', display:"flex", letterSpacing:'.7px', border:'1px solid #d2d2d2', padding:'0.5em', borderRadius:'0.25rem' }}
                  //         />
                  //       )}
                  //       {/* !!!!!!    Took out "add" in line above, changed marginRight, added letterSpacing, border, padding, borderRadius */}
                  //       <CopyText
                  //         copyText={copyText}
                  //         text={'Copy Link'}
                  //         className="btn round px-0 btn-sm"
                  //         style={{ marginRight: 10, fontWeight: 'bold', border:'1px solid #d2d2d2', padding:'0.5em', borderRadius:'0.25rem' }} 

                  //       />
                  //       {/* !!!!!!    Added border, padding, borderRadius I found from other buttons on WS site, possibly: -> , color:'#fff' , backgroundColor:'#007bff', padding:'0.65em 1.6em', borderRadius:'1000px' <- */}
                  //     </>
                  //   )}
                  // </>


      }
    >
      {projectId === undefined ? (
        <div className="flex-c-c" style={{ width: '100%' }}>
          <IconLoaderCircle
            length={16}
            widthPercent={0.1825}
            bg={'rgba(0, 0, 0, 0.5)'}
          />
        </div>
      ) : (
        // took out a display block
        <div style={{  width: '100%' }}>
          <form>
            <div style={{ display: 'flex', gap: 15 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  textAlign: "center",
                  background: 'radial-gradient( #fff, #ecf5fe)',
                  borderRadius: 4,
                }}
                className="flex-c-c"
              >
                <FeatherIcon size={27} icon={'calendar'} marginTop={"8px"} className='calenderIcon'/>
              </div>
              <div className="w-100">
                <div
                  style={{
                    display: 'flex',
                    gap: 20,
                    justifyContent: 'space-between',
                  }}
                >
                  <div className="w-100">
                    <div>
                      <strong className="flex-c" style={{ gap: 8 }}>
                        {/* {name}{' '} */}
                        <button
                          type={'button'}
                          style={{ marginTop: -2 }}
                          onClick={onEdit}
                        >
                          <FeatherIcon
                            icon={'edit'}
                            size={'.8em'}
                            alt={'edit'}
                          />
                        </button>
                        <Label className={'flex-c mb-0'}>
                          <Input
                            maxLength={150}
                            onFocus={() => setTitleFocus(true)}
                            onBlur={() => setTitleFocus(false)}
                            value={titleValue}
                            onChange={e => {
                              const val = e.target.value;
                              setTitle(val);
                            }}
                            style={{ fontWeight: 'bold' }}
                            type="text"
                            className={`form-control`}
                            placeholder="Title – May include emoticons 👋 ✨"
                            required
                          />
                        </Label>
                      </strong>
                    </div>
                    {!isGroupClass && length && (
                      <div>
                        <small className="flex-c">
                          <FeatherIcon
                            icon={'clock'}
                            style={{ marginRight: 5, marginTop: 4 }}
                            size={'1em'}
                          />
                          {/* {length} {lengthType || 'minutes'} */}
                          <div
                            className={'flex-c mb-0 pr-1'}
                            style={{ padding: '0', fontSize: '95%' }}
                          >
                            <InputDuration
                              maxLength={5}
                              onFocus={() => setDurationAmountFocus(true)}
                              onBlur={() => setDurationAmountFocus(false)}
                              value={durationAmountValue}
                              onChange={e => {
                                let newUpdatedLength = e.target.value.replace(
                                  /\D/g,
                                  '',
                                );

                                // config.event.duration: Duration exceeds maximum value of 720 (12 hours).
                                if (
                                  durationTypeValue === 'minutes' &&
                                  newUpdatedLength > 720
                                ) {
                                  newUpdatedLength = 720;
                                } else if (
                                  durationTypeValue === 'hours' &&
                                  newUpdatedLength > 12
                                ) {
                                  newUpdatedLength = 12;
                                }

                                setDurationAmountValue(newUpdatedLength);
                              }}
                              type="text"
                              // className={`form-control`}
                              placeholder="30"
                              required
                            />
                          </div>
                          {/* {length} {lengthType || 'minutes'} */}
                          <div
                            className={'flex-c mb-0'}
                            style={{ padding: '0', fontSize: '95%' }}
                          >
                            <InputSelect
                              maxLength={150}
                              onFocus={() => setDurationTypeFocus(true)}
                              onBlur={() => setDurationTypeFocus(false)}
                              value={durationTypeValue}
                              onChange={e => {
                                const val = e.target.value;
                                setDurationTypeValue(val);
                              }}
                              type="text"
                              className={`form-control`}
                              placeholder="minutes"
                              required
                            >
                              {MINUTE_HOUR_DURATION_OPTIONS.reverse().map(o => (
                                <option key={o} value={o}>
                                  {o}
                                </option>
                              ))}
                            </InputSelect>
                          </div>
                        </small>
                      </div>
                    )}
                     {isGroupClass && (
                      <div>
                        <small className="flex-c">
                          {(groupClassInstances || []).length > 0
                            ? `${groupClassInstances.length} upcoming dates`
                            : 'No upcoming dates'}
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>

          {editing && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="d-flex justify-content-start">
                <BtnRemove
                  removeText={
                    'Are you sure you want to remove this appointment type?'
                  }
                  confirm
                  className={'btn-sm'}
                  onCancel={() => {
                    setClickedRemove(false);
                  }}
                  onPointerDown={() => setClickedRemove(true)}
                  onClick={() => {
                    if (onRemove) onRemove(projectId, apptKey);
                    setClickedRemove(false);
                  }}
                />
              </div>
              <div>
                <button
                  type={'button'}
                  className="btn round btn-sm"
                  onClick={() => {
                    // Reset
                    setTitle(name);
                    setDurationAmountValue(length);
                    setDurationTypeValue(lengthType);
                  }}
                >
                  Cancel
                </button>
                <button
                  onPointerDown={() => setClickedSave(true)}
                  onClick={() => {
                    if (onSave)
                      onSave({
                        isPartialUpdate: true,
                        projectId,
                        projectName: titleValue,
                        projectLength: durationAmountValue,
                        projectLengthUnit: durationTypeValue,
                      });
                    // setShowAdvancedSettings(false);
                  }}
                  onPointerUp={() => setClickedSave(false)}
                  disabled={
                    !inputChanged ||
                    !titleValue ||
                    !durationAmountValue ||
                    !durationTypeValue
                  }
                  type={'button'}
                  className="btn btn-primary round btn-sm"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </SectionListItem>
  );
};


function Appointments({
  id,
  data,
  saveNewSession,
  togglePopup,
  saveOrdering,
  tenantNameAsUrl,
  title,
  refreshTenantData,
  tenantData,
  setTenantData,
  isGroupClass,
  projectId,
}) {
  const user = "test";
  const { subscriptionPlan } = tenantData || {};

  const [popUpOpen, setPopUpOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [dragId, setDragId] = useState();
  const [isReorderUnsaved, setIsReorderUnsaved] = useState(false);
  const [loader, setLoader] = useState(false);

  const hiddenAppointments = data ? data.filter(({ hidePublic }) => hidePublic) : [];

  const togglePopUp = () => {
    setPopUpOpen(v => !v);
  };

  const handleSave = () => {
    console.log('saveNewSession:', saveNewSession);
    if (saveNewSession && typeof saveNewSession === 'function') {
      saveNewSession(projectName);
      setPopUpOpen(false);
    } else {
      console.error('saveNewSession is not a function');
    }
  };

  const handleDrag = orderIndex => {
    setDragId(orderIndex);
  };

  const handleDrop = (fromIndex, toIndex) => {
    const updatedItems = [...boxes].slice(0);
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    const newBoxes = updatedItems.map((o, i) => ({ ...o, order: i }));
    setBoxes(newBoxes);
    setIsReorderUnsaved(true);
  };

  const handleSaveOrdering = () => {
    setIsReorderUnsaved(false);
    saveOrdering(boxes);
  };

  const onSaveAppointmentTypeUpdate = () => {
    console.log("hello");
  };

  const onDeleteAppointmentType = () => {
    console.log("onDeleteAppointmentType");
  };

  useEffect(() => {
    if (data) {
      const boxesArray = data
        .filter(o => !o.hidePublic)
        .map((o, i) => ({
          id: o.id,
          order: o.order !== null ? o.order : i,
          project: o,
        }));
      setBoxes(boxesArray);
    }
  }, [data]);

  return (
    <>
      {(!boxes || boxes.length === 0) && (!hiddenAppointments || hiddenAppointments.length === 0) ? (
        <EmptySection
          id={id}
          text={
            <>
              No {isGroupClass ? 'Group Classes or Sessions' : 'Appointment Types'} yet.
              <br />
              Click to add your first! <span role={'img'} aria-label={'celebration'}>🎉</span>
            </>
          }
          btnText={'Add'}
          onClick={togglePopUp}
        />
      ) : (
        <Section
          id={id}
          title={title}
          headerActions={
            <>
              {isReorderUnsaved && (
                <button
                  type="button"
                  className="btn btn-primary round"
                  onClick={handleSaveOrdering}
                >
                  Save Re-ordering
                </button>
              )}
              <>
                 {/* !!!!!     Embed Code button     !!!!! */}
              {/* NOTE: turn this into flex container to position it better and more consistently with existing code! */}
              <div className='embedCodeBtn'>
                <EmbedCodeButton
                  src="${SPARKLE_PATH}${tenantNameAsUrl}?widgetMode=true#bookings"
                  id="framee"
                  name="framee" 
                  style={{border: 'none'}} width="600" height="400"
                />
              </div>
              </>
              <button
                type="button"
                className="btn round flex-c-c px-0 ml-4"
                onClick={togglePopUp}
                style={{ gap: 5, display:"flex", border:"none", background:"#f7f7f7", fontWeight:"bold"}}
              >
                Add <FeatherIcon icon={'plus'} size={'.95em'} />
                <span style={{ width: 15, display: 'inline-block' }} />
              </button>
            </>
          }
          noBackground
        >
          {boxes && boxes.length > 0 && (
            <Section title={'Visible'} noBackground>

             
              
              {boxes
                .sort((a, b) => a.order - b.order)
                .map((box, i) => {
                  const link = `${SPARKLE_PATH}${tenantNameAsUrl}?project=${box.project.id}#bookings`;
                  const {
                    project: {
                      id: projectId,
                      internalId,
                      name,
                      length,
                      lengthType,
                      order,
                    },
                  } = box;
                  const keyId = projectId || internalId;
                  return (
                    <ApptItem
                      isGroupClass={isGroupClass}
                      copyText={link}
                      key={`${keyId}-${i}`}
                      apptKey={`${keyId}-${i}`}
                      lastItem={boxes.length - 1 === i}
                      tenantId={user && user['https://wesparkle.biz/sparkleTenantId']}
                      id={keyId}
                      projectId={projectId}
                      name={name}
                      length={length}
                      lengthType={lengthType}
                      orderIndex={i}
                      order={order}
                      draggable
                      onDragOver={e => e.preventDefault()}
                      onDragStart={() => handleDrag(i)}
                      onDrop={() => handleDrop(dragId, i)}
                      onSave={onSaveAppointmentTypeUpdate}
                      onRemove={onDeleteAppointmentType}
                      onEdit={() => {
                        togglePopup(projectId, name);
                      }}
                    />
                  );
                })}
            </Section>
          )}
          {hiddenAppointments && hiddenAppointments.length > 0 && (
            <Section title={'Hidden'} noBackground>
              {hiddenAppointments
                .sort((a, b) => a.order - b.order)
                .map((project, i) => {
                  const {
                    id: projectId,
                    internalId,
                    name,
                    length,
                    lengthType,
                  } = project;
                  const link = `${SPARKLE_PATH}${tenantNameAsUrl}?project=${projectId}#bookings`;
                  const keyId = projectId || internalId;
                  return (
                    <ApptItem
                      isGroupClass={isGroupClass}
                      copyText={link}
                      key={`${keyId}-${i}`}
                      apptKey={`${keyId}-${i}`}
                      lastItem={hiddenAppointments.length - 1 === i}
                      tenantId={user && user['https://wesparkle.biz/sparkleTenantId']}
                      id={keyId}
                      projectId={projectId}
                      name={name}
                      length={length}
                      lengthType={lengthType}
                      onSave={onSaveAppointmentTypeUpdate}
                      onRemove={onDeleteAppointmentType}
                      onEdit={() => {
                        togglePopup(projectId, name);
                      }}
                    />
                  );
                })}
            </Section>
          )}
        </Section>
      )}
      <Modal show={popUpOpen} onHide={togglePopUp}>
        <Modal.Header closeButton>
          <Modal.Title>
            Create {isGroupClass ? 'Group Session' : 'Appointment Type'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="form-group">
              <label htmlFor="popup-input">Name:</label>
              <input
                id="popup-input"
                className="form-control"
                type="text"
                onChange={e => setProjectName(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            className="btn round btn-sm"
            variant="outline-secondary"
            onClick={togglePopUp}
          >
            Cancel
          </Button>
          <Button
            className="btn round btn-sm"
            variant="info"
            disabled={!projectName}
            onClick={handleSave}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ApptItem.Appointments = Appointments;

export default ApptItem;
// export default Appointments;


  
  const getUpcomingBookingsForAppointmentType = () =>{
    console.log("getUpcomingBookingsForAppointmentType");
  }
  // function getUpcomingBookingsForAppointmentType(upcomingBookings, projectId) {
  //   // console.log({ upcomingBookings });
  //   return (upcomingBookings || []).filter(o => {
  //     const { event } = o || {};
  //     const { start } = event || {};
  //     const isFuture = moment(start) > moment();
  
  //     if (isFuture) {
  //       return true;
  //     }
  
  //     return false;
  //   });
  // }
  
  function checkIfMaxedOut(usage, max) {
    if (!max && max !== 0) {
      return false;
    }
  
    return usage >= max;
  }
  
  /**
   *  STYLED COMPONENTS
   */
  
  // styled sub components
  const Label = styled.label`
    width: 100%;
    padding: 0;
  `;
  // const AdditionalLabel = styled.label`
  //   width: 100%;
  //   padding: 0;
  //   font-size: 1rem;
  // `;
  // const Prefix = styled.span`
  //   color: #222;
  //   font-size: 1rem;
  //   font-weight: lighter;
  //   padding: 4px 0px 2px 0px;
  //   line-height: 1;
  // `;
  const InputDuration = styled.input`
    width: ${props => {
      // Find the character length of the current value held in the text input
      const valueLength = props && props.value ? `${props.value}`.length : 1;
      // Absolute min of 1 character length / Absolute max of 5 characters
      const calcWidth = Math.min(Math.max(valueLength, 1), 5);
      // ch vs px - ch represents the width of the character '0'
      // therefore 5ch would be enough space to hold a width of the string '00000'
      return `${calcWidth}ch`;
    }};
    color: #222;
    height: auto;
    border: none;
    font-size: 1rem;
    border-color: transparent;
    padding: 4px 0px 2px 0px;
    border-radius: 3px 3px 0px 0px;
    line-height: 1;
    border-bottom: 1px solid transparent;
    :focus {
      color: #222;
      border-bottom: 1px solid #007bff;
    }
  `;
  const Input = styled.input`
    color: #222;
    height: auto;
    border: none;
    font-size: 1rem;
    border-color: transparent;
    padding: 4px 0px 2px 0px;
    border-radius: 3px 3px 0px 0px;
    line-height: 1;
    border-bottom: 1px solid transparent;
    :focus {
      color: #222;
      border-bottom: 1px solid #007bff;
    }
  `;
  // const InputTextArea = styled.textarea`
  //   color: #222;
  //   height: auto;
  //   border: none;
  //   font-size: 1rem;
  //   border-color: transparent;
  //   padding: 4px 0px 2px 0px;
  //   border-radius: 3px 3px 0px 0px;
  //   line-height: 1;
  //   border-bottom: 1px solid transparent;
  //   resize: none;
  //   :focus {
  //     color: #222;
  //     border-bottom: 1px solid #007bff;
  //     resize: both;
  //   }
  // `;
  
  const InputSelect = styled.select`
    color: #222;
    height: auto;
    border: none;
    font-size: 1rem;
    border-color: transparent;
    padding: 4px 0px 2px 0px;
    border-radius: 3px 3px 0px 0px;
    line-height: 1;
    border-bottom: 1px solid transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-overflow: '';
    :focus {
      color: #222;
      border-bottom: 1px solid #007bff;
    }
  `;















// 2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// function Appointments({
//   id,
//   data,
//   saveNewSession,
//   togglePopup,
//   saveOrdering,
//   tenantNameAsUrl,
//   title,
//   refreshTenantData,
//   tenantData,
//   setTenantData,
//   isGroupClass,
// }) {
//   const user = "test";
//   const { subscriptionPlan } = tenantData || {};

//   const [popUpOpen, setPopUpOpen] = useState(false);
//   const [projectName, setProjectName] = useState('');
//   const [boxes, setBoxes] = useState([]);
//   const [dragId, setDragId] = useState();
//   const [isReorderUnsaved, setIsReorderUnsaved] = useState(false);
//   const [loader, setLoader] = useState(false);

//   const hiddenAppointments = data ? data.filter(({ hidePublic }) => hidePublic) : [];

//   const togglePopUp = () => {
//     setPopUpOpen(v => !v);
//   };

//   const handleSave = () => {
//     console.log('saveNewSession:', saveNewSession);
//     if (saveNewSession && typeof saveNewSession === 'function') {
//       saveNewSession(projectName);
//       setPopUpOpen(false);
//     } else {
//       console.error('saveNewSession is not a function');
//     }
//   };

//   const handleDrag = orderIndex => {
//     setDragId(orderIndex);
//   };

//   const handleDrop = (fromIndex, toIndex) => {
//     const updatedItems = [...boxes].slice(0);
//     const [movedItem] = updatedItems.splice(fromIndex, 1);
//     updatedItems.splice(toIndex, 0, movedItem);
//     const newBoxes = updatedItems.map((o, i) => ({ ...o, order: i }));
//     setBoxes(newBoxes);
//     setIsReorderUnsaved(true);
//   };

//   const handleSaveOrdering = () => {
//     setIsReorderUnsaved(false);
//     saveOrdering(boxes);
//   };

//   const onSaveAppointmentTypeUpdate = () => {
//     console.log("hello");
//   };

//   const onDeleteAppointmentType = () => {
//     console.log("onDeleteAppointmentType");
//   };

//   useEffect(() => {
//     if (data) {
//       const boxesArray = data
//         .filter(o => !o.hidePublic)
//         .map((o, i) => ({
//           id: o.id,
//           order: o.order !== null ? o.order : i,
//           project: o,
//         }));
//       setBoxes(boxesArray);
//     }
//   }, [data]);

//   return (
//     <>
//       {(!boxes || boxes.length === 0) && (!hiddenAppointments || hiddenAppointments.length === 0) ? (
//         <EmptySection
//           id={id}
//           text={
//             <>
//               No {isGroupClass ? 'Group Classes or Sessions' : 'Appointment Types'} yet.
//               <br />
//               Click to add your first! <span role={'img'} aria-label={'celebration'}>🎉</span>
//             </>
//           }
//           btnText={'Add'}
//           onClick={togglePopUp}
//         />
//       ) : (
//         <Section
//           id={id}
//           title={title}
//           headerActions={
//             <>
//               {isReorderUnsaved && (
//                 <button
//                   type="button"
//                   className="btn btn-primary round"
//                   onClick={handleSaveOrdering}
//                 >
//                   Save Re-ordering
//                 </button>
//               )}
//               <button
//                 type="button"
//                 className="btn round flex-c-c px-0 ml-4"
//                 onClick={togglePopUp}
//                 style={{ gap: 5 }}
//               >
//                 Add <FeatherIcon icon={'plus'} size={'.95em'} />
//                 <span style={{ width: 15, display: 'inline-block' }} />
//               </button>
//             </>
//           }
//           noBackground
//         >
//           {boxes && boxes.length > 0 && (
//             <Section title={'Visible'} noBackground>
//               {boxes
//                 .sort((a, b) => a.order - b.order)
//                 .map((box, i) => {
//                   const link = `${SPARKLE_PATH}${tenantNameAsUrl}?project=${box.project.id}#bookings`;
//                   const {
//                     project: {
//                       id: projectId,
//                       internalId,
//                       name,
//                       length,
//                       lengthType,
//                       order,
//                     },
//                   } = box;
//                   const keyId = projectId || internalId;
//                   return (
//                     <ApptItem
//                       isGroupClass={isGroupClass}
//                       copyText={link}
//                       key={`${keyId}-${i}`}
//                       apptKey={`${keyId}-${i}`}
//                       lastItem={boxes.length - 1 === i}
//                       tenantId={user && user['https://wesparkle.biz/sparkleTenantId']}
//                       id={keyId}
//                       projectId={projectId}
//                       name={name}
//                       length={length}
//                       lengthType={lengthType}
//                       orderIndex={i}
//                       order={order}
//                       draggable
//                       onDragOver={e => e.preventDefault()}
//                       onDragStart={() => handleDrag(i)}
//                       onDrop={() => handleDrop(dragId, i)}
//                       onSave={onSaveAppointmentTypeUpdate}
//                       onRemove={onDeleteAppointmentType}
//                       onEdit={() => {
//                         togglePopup(projectId, name);
//                       }}
//                     />
//                   );
//                 })}
//             </Section>
//           )}
//           {hiddenAppointments && hiddenAppointments.length > 0 && (
//             <Section title={'Hidden'} noBackground>
//               {hiddenAppointments
//                 .sort((a, b) => a.order - b.order)
//                 .map((project, i) => {
//                   const {
//                     id: projectId,
//                     internalId,
//                     name,
//                     length,
//                     lengthType,
//                   } = project;
//                   const link = `${SPARKLE_PATH}${tenantNameAsUrl}?project=${projectId}#bookings`;
//                   const keyId = projectId || internalId;
//                   return (
//                     <ApptItem
//                       isGroupClass={isGroupClass}
//                       copyText={link}
//                       key={`${keyId}-${i}`}
//                       apptKey={`${keyId}-${i}`}
//                       lastItem={hiddenAppointments.length - 1 === i}
//                       tenantId={user && user['https://wesparkle.biz/sparkleTenantId']}
//                       id={keyId}
//                       projectId={projectId}
//                       name={name}
//                       length={length}
//                       lengthType={lengthType}
//                       onSave={onSaveAppointmentTypeUpdate}
//                       onRemove={onDeleteAppointmentType}
//                       onEdit={() => {
//                         togglePopup(projectId, name);
//                       }}
//                     />
//                   );
//                 })}
//             </Section>
//           )}
//         </Section>
//       )}
//       <Modal show={popUpOpen} onHide={togglePopUp}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Create {isGroupClass ? 'Group Session' : 'Appointment Type'}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="container">
//             <div className="form-group">
//               <label htmlFor="popup-input">Name:</label>
//               <input
//                 id="popup-input"
//                 className="form-control"
//                 type="text"
//                 onChange={e => setProjectName(e.target.value)}
//               />
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer className="d-flex justify-content-between">
//           <Button
//             className="btn round btn-sm"
//             variant="outline-secondary"
//             onClick={togglePopUp}
//           >
//             Cancel
//           </Button>
//           <Button
//             className="btn round btn-sm"
//             variant="info"
//             disabled={!projectName}
//             onClick={handleSave}
//           >
//             Create
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default Appointments;



















//1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




  // function Appointments({
  //   id,
  //   data,
  //   saveNewSession,
  //   togglePopup,
  //   saveOrdering,
  //   tenantNameAsUrl,
  //   title,
  //   refreshTenantData,
  //   tenantData,
  //   setTenantData,
  //   isGroupClass,
  //   // upcomingBookings,
  // }) {
  //   const user = "test";
  //   // const { user } = useAuth0();
  //   const { subscriptionPlan } = tenantData || {};
  
  //   // Check for usage limits
  //   // const { limits, usage } = useContext(UserUsageContext);
  //   // const { appointmentTypeMax, groupClassMax } = limits || {};
  //   // const { appointmentTypeCount, groupClassCount } = usage || {};
  //   // const isAppointmentTypesMaxedOut = checkIfMaxedOut(
  //   //   appointmentTypeCount,
  //   //   appointmentTypeMax,
  //   // );
  //   // const isGroupClassTypesMaxedOut = checkIfMaxedOut(
  //   //   groupClassCount,
  //   //   groupClassMax,
  //   // );
  
  //   // // Upgrade modal (if applicable)
  //   // const { showUpgradeModal } = useContext(UserUsageDispatchContext);
  
  //   const [popUpOpen, setPopUpOpen] = useState(false);
  //   const [projectName, setProjectName] = useState(''); // Do not really know if this is needed
  //   const [boxes, setBoxes] = useState([]); // this should be reordered boxes?
  //   const [dragId, setDragId] = useState();
  //   const [isReorderUnsaved, setIsReorderUnsaved] = useState(false);
  //   const [loader, setLoader] = useState(false);
  
  //   // const {
  //   //   updateAppointmentType,
  //   //   updateGroupAppointmentType,
  //   //   deleteAppointmentType,
  //   //   deleteGroupAppointmentType,
  //   // } = useUpdateAppointmentTypeApi();
  
  //   const hiddenAppointments = data
  //     ? data.filter(({ hidePublic }) => hidePublic)
  //     : [];
  
  //   const togglePopUp = () => {
  //     console.log("Hello");
  //     setPopUpOpen(v => !v);
  //     // if (!isGroupClass && isAppointmentTypesMaxedOut) {
  //     //   showUpgradeModal('Upgrade now to add more Appointment Types.');
  //     // } else if (isGroupClass && isGroupClassTypesMaxedOut) {
  //     //   showUpgradeModal('Upgrade now to add more Group Classes.');
  //     // } else {
  //     //   setPopUpOpen(v => !v);
      
  //   };
  //   const handleSave = () => {
  //     saveNewSession(projectName);
  //     setPopUpOpen(false);
  //   };
  //   const handleDrag = orderIndex => {
  //     setDragId(orderIndex);
  //   };
  //   const handleDrop = (fromIndex, toIndex) => {
  //     // New way
  //     const updatedItems = [...boxes].slice(0);
  //     const [movedItem] = updatedItems.splice(fromIndex, 1);
  //     console.log({ movedItem, updatedItems });
  //     updatedItems.splice(toIndex, 0, movedItem);
  
  //     const newBoxes = updatedItems.map((o, i) => ({ ...o, order: i }));
  
  //     setBoxes(newBoxes);
  //     setIsReorderUnsaved(true);
  //   };
  
  //   const handleSaveOrdering = () => {
  //     setIsReorderUnsaved(false);
  //     saveOrdering(boxes);
  //   };
  
  //   const onSaveAppointmentTypeUpdate = () =>{
  //     console.log("hello");
  //   }
  //   // const onSaveAppointmentTypeUpdate = updatedAppointmentType => {
  //   //   const appointmentTypeObjToUpdate = {
  //   //     ...updatedAppointmentType,
  //   //     tenantId: user['https://wesparkle.biz/sparkleTenantId'],
  //   //   };
  
  //   //   const {
  //   //     projectId,
  //   //     projectName: name,
  //   //     projectLength,
  //   //     projectLengthUnit,
  //   //   } = updatedAppointmentType;
  
  //   //   if (isGroupClass) {
  //   //     updateGroupAppointmentType({
  //   //       appointmentTypeObj: appointmentTypeObjToUpdate,
  //   //       onCompletedSuccessfullyCallback: () => {
  //   //         refreshTenantData();
  //   //       },
  //   //     });
  
  //   //     // Optimistically - update local tenant
  //   //     const existingAppointmentType = tenantData.tenantGroupClasses.find(
  //   //       o => o.id === projectId,
  //   //     );
  //   //     const updatedAppointmentTypeObj = {
  //   //       ...existingAppointmentType,
  //   //       name,
  //   //       length: projectLength,
  //   //       lengthType: projectLengthUnit,
  //   //     };
  //   //     const appointmentTypes = tenantData.tenantGroupClasses.filter(
  //   //       o => o.id !== projectId,
  //   //     );
  //   //     const updatedAppointmentTypes = [
  //   //       ...appointmentTypes,
  //   //       updatedAppointmentTypeObj,
  //   //     ];
  //   //     const updatedTenant = {
  //   //       ...tenantData,
  //   //       tenantGroupClasses: updatedAppointmentTypes,
  //   //     };
  
  //   //     setTenantData(updatedTenant);
  //   //   } else {
  //   //     updateAppointmentType({
  //   //       appointmentTypeObj: appointmentTypeObjToUpdate,
  //   //       onCompletedSuccessfullyCallback: () => {
  //   //         refreshTenantData();
  //   //       },
  //   //     });
  
  //   //     // Optimistically - update local tenant
  //   //     const existingAppointmentType = tenantData.tenantAppointmentTypes.find(
  //   //       o => o.id === projectId,
  //   //     );
  //   //     const updatedAppointmentTypeObj = {
  //   //       ...existingAppointmentType,
  //   //       name,
  //   //       length: projectLength,
  //   //       lengthType: projectLengthUnit,
  //   //     };
  //   //     const appointmentTypes = tenantData.tenantAppointmentTypes.filter(
  //   //       o => o.id !== projectId,
  //   //     );
  //   //     const updatedAppointmentTypes = [
  //   //       ...appointmentTypes,
  //   //       updatedAppointmentTypeObj,
  //   //     ];
  //   //     const updatedTenant = {
  //   //       ...tenantData,
  //   //       tenantAppointmentTypes: updatedAppointmentTypes,
  //   //     };
  
  //   //     setTenantData(updatedTenant);
  //   //   }
  //   // };
  
  //   const onDeleteAppointmentType = () =>{
  //     console.log("onDeleteAppointmentType")
  //   }
  //   // const onDeleteAppointmentType = (appointmentTypeId, internalId) => {
  //   //   const appointmentTypeObjToDelete = {
  //   //     projectId: appointmentTypeId,
  //   //     tenantId: user['https://wesparkle.biz/sparkleTenantId'],
  //   //   };
  
  //   //   if (isGroupClass) {
  //   //     if (appointmentTypeId) {
  //   //       // Remove from server/api
  //   //       deleteGroupAppointmentType({
  //   //         appointmentTypeObjToDelete,
  //   //         onDeletedSuccessfullyCallback: () => {
  //   //           refreshTenantData();
  //   //         },
  //   //       });
  //   //     }
  
  //   //     // Remove locally
  //   //     // Optimistically - update local tenant
  //   //     const appointmentTypes = internalId
  //   //       ? tenantData.tenantGroupClasses.filter(o => o.internalId !== internalId)
  //   //       : tenantData.tenantGroupClasses.filter(o => o.id !== appointmentTypeId);
  
  //   //     const updatedTenant = {
  //   //       ...tenantData,
  //   //       tenantGroupClasses: appointmentTypes,
  //   //     };
  
  //   //     setTenantData(updatedTenant);
  //   //   } else {
  //   //     if (appointmentTypeId) {
  //   //       // Remove from server/api
  //   //       deleteAppointmentType({
  //   //         appointmentTypeObjToDelete,
  //   //         onDeletedSuccessfullyCallback: () => {
  //   //           refreshTenantData();
  //   //         },
  //   //       });
  //   //     }
  
  //   //     // Remove locally
  //   //     // Optimistically - update local tenant
  //   //     const appointmentTypes = internalId
  //   //       ? tenantData.tenantAppointmentTypes.filter(
  //   //           o => o.internalId !== internalId,
  //   //         )
  //   //       : tenantData.tenantAppointmentTypes.filter(
  //   //           o => o.id !== appointmentTypeId,
  //   //         );
  
  //   //     const updatedTenant = {
  //   //       ...tenantData,
  //   //       tenantAppointmentTypes: appointmentTypes,
  //   //     };
  
  //   //     setTenantData(updatedTenant);
  //   //   }
  //   // };
  
  //   useEffect(() => {
  //     if (data) {
  //       const boxesArray = data
  //         .filter(o => !o.hidePublic)
  //         .map((o, i) => ({
  //           id: o.id,
  //           order: o.order !== null ? o.order : i,
  //           project: o,
  //         }));
  
  //       // On Sparkle Page
  //       setBoxes(boxesArray);
  //     }
  //   }, [data]);
  
  //   return (
  //     <>saveNewSession
  //       {(!boxes || boxes.length === 0) &&
  //       (!hiddenAppointments || hiddenAppointments.length === 0) ? (
  //         <EmptySection
  //           id={id}
  //           text={
  //             <>
  //               No{' '}
  //               {isGroupClass ? 'Group Classes or Sessions' : 'Appointment Types'}{' '}
  //               yet.
  //               <br />
  //               Click to add your first!{' '}
  //               <span role={'img'} aria-label={'celebration'}>
  //                 🎉
  //               </span>
  //             </>
  //           }
  //           btnText={'Add'}
  //           onClick={togglePopUp}
  //         />
  //       ) : (
  //         <Section
  //           id={id}
  //           title={title}
  //           headerActions={
  //             <>
  //               {isReorderUnsaved && (
  //                 <button
  //                   type="button"
  //                   className="btn btn-primary round"
  //                   onClick={handleSaveOrdering}
  //                 >
  //                   Save Re-ordering
  //                 </button>
  //               )}
  //               <button
  //                 type="button"
  //                 className="btn round flex-c-c px-0 ml-4"
  //                 onClick={togglePopUp}
  //                 style={{ gap: 5 }}
  //               >
  //                 Add <FeatherIcon icon={'plus'} size={'.95em'} />
  //                 <span style={{ width: 15, display: 'inline-block' }} />
  //               </button>
  //             </>
  //           }
  //           noBackground
  //         >
  //           {boxes && boxes.length > 0 && (
  //             <>
  //               <Section title={'Visible'} noBackground>
  //                 {boxes
  //                   .sort((a, b) => a.order - b.order)
  //                   .map((box, i) => {
  //                     const link = `${SPARKLE_PATH}${tenantNameAsUrl}?project=${
  //                       box.project.id
  //                     }#bookings`;
  //                     const {
  //                       project: {
  //                         id: projectId,
  //                         internalId,
  //                         name,
  //                         length,
  //                         lengthType,
  //                         order,
  //                       },
  //                     } = box;
  
  //                     const keyId = projectId || internalId;
  
  //                     // const upcomingBookingsForAptType = getUpcomingBookingsForAppointmentType(
  //                     //   upcomingBookings,
  //                     //   projectId,
  //                     // );
  
  //                     return (
  //                       <ApptItem
  //                         isGroupClass={isGroupClass}
  //                         // upcomingBookings={upcomingBookingsForAptType}
  //                         copyText={link}
  //                         key={`${keyId}-${i}`}
  //                         apptKey={`${keyId}-${i}`}
  //                         lastItem={boxes.length - 1 === i}
  //                         tenantId={
  //                           user && user['https://wesparkle.biz/sparkleTenantId']
  //                         }
  //                         id={keyId}
  //                         projectId={projectId}
  //                         name={name}
  //                         length={length}
  //                         lengthType={lengthType}
  //                         orderIndex={i}
  //                         order={order}
  //                         draggable
  //                         onDragOver={e => e.preventDefault()}
  //                         onDragStart={() => handleDrag(i)}
  //                         onDrop={() => handleDrop(dragId, i)}
  //                         onSave={onSaveAppointmentTypeUpdate}
  //                         onRemove={onDeleteAppointmentType}
  //                         onEdit={() => {
  //                           togglePopup(projectId, name);
  //                         }}
  //                       />
  //                     );
  //                   })}
  //               </Section>
  //             </>
  //           )}
  //           {hiddenAppointments && hiddenAppointments.length > 0 && (
  //             <>
  //               <Section title={'Hidden'} noBackground>
  //                 {hiddenAppointments &&
  //                   hiddenAppointments.length > 0 &&
  //                   boxes &&
  //                   boxes.length > 0 &&
  //                   subscriptionPlan &&
  //                   subscriptionPlan === 'FREE' && (
  //                     <SectionListItem>
  //                       <p className="card-text">
  //                         <Link to="/account-settings/dashboard/my-account">
  //                           Upgrade
  //                         </Link>{' '}
  //                         to a paid plan to have more than one Appointment Type
  //                         visible.
  //                       </p>
  //                     </SectionListItem>
  //                   )}
  
  //                 {hiddenAppointments
  //                   .sort((a, b) => a.order - b.order)
  //                   .map((project, i) => {
  //                     const {
  //                       id: projectId,
  //                       internalId,
  //                       name,
  //                       length,
  //                       lengthType,
  //                     } = project;
  //                     const link = `${SPARKLE_PATH}${tenantNameAsUrl}?project=${projectId}#bookings`;
  
  //                     const keyId = projectId || internalId;
  
  //                     // const upcomingBookingsForAptType = getUpcomingBookingsForAppointmentType(
  //                     //   upcomingBookings,
  //                     //   projectId,
  //                     // );
  
  //                     return (
  //                       <ApptItem
  //                         isGroupClass={isGroupClass}
  //                         // upcomingBookings={upcomingBookingsForAptType}
  //                         copyText={link}
  //                         key={`${keyId}-${i}`}
  //                         apptKey={`${keyId}-${i}`}
  //                         lastItem={hiddenAppointments.length - 1 === i}
  //                         tenantId={
  //                           user && user['https://wesparkle.biz/sparkleTenantId']
  //                         }
  //                         id={keyId}
  //                         projectId={projectId}
  //                         name={name}
  //                         length={length}
  //                         lengthType={lengthType}
  //                         onSave={onSaveAppointmentTypeUpdate}
  //                         onRemove={onDeleteAppointmentType}
  //                         onEdit={() => {
  //                           togglePopup(projectId, name);
  //                         }}
  //                       />
  //                     );
  //                   })}
  //               </Section>
  //             </>
  //           )}
  //         </Section>
  //       )}
  //       <Modal show={popUpOpen} onHide={togglePopUp}>
  //         <Modal.Header closeButton>
  //           <Modal.Title>
  //             Create {isGroupClass ? 'Group Session' : 'Appointment Type'}
  //           </Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <div className="container">
  //             <div className="form-group">
  //               <label htmlFor="popup-input">Name:</label>
  //               <input
  //                 id="popup-input"
  //                 className="form-control"
  //                 type="text"
  //                 onChange={e => setProjectName(e.target.value)}
  //               />
  //             </div>
  //           </div>
  //         </Modal.Body>
  //         <Modal.Footer className="d-flex justify-content-between">
  //           <Button
  //             className="btn round btn-sm"
  //             variant="outline-secondary"
  //             onClick={togglePopUp}
  //           >
  //             Cancel
  //           </Button>
  //           <Button
  //             className="btn round btn-sm"
  //             variant="info"
  //             disabled={!projectName}
  //             onClick={handleSave}
  //           >
  //             Create
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //     </>
  //   );
  // }
  
  // export default memo(Appointments);