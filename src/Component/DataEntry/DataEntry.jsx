import React, { useState } from 'react';
import axios from 'axios'; 


import {whitevariationSvg,FolderSvg,CircleSvg,Cart,GreenSvg,Co2,PiechartSvg,AddIcon,SearchSvg,UploadSvg,User,Leftarrow,Layer1,Layer2,Layer3} from "./../../assets";
const DataEntry = () => {

        const [file, setFile] = useState(null);
        const [rowCount, setRowCount] = useState(0); 
        const [selectedYear, setSelectedYear] = useState(''); 
        const [selectedMonth, setSelectedMonth] = useState(''); 
        const [selectedFacilityCode, setSelectedFacilityCode] = useState('');
        const [selectedFacilityName, setSelectedFacilityName] = useState('');
        const [facilityCodes] = useState(['001', '002', '003', '004', '005']);
        const [facilityNames] = useState(['Mobile Combustion', 'Facility 2', 'Facility 3', 'Facility 4', 'Facility 5']);
        const yearRanges = [
            '2022-2023',
            '2021-2022',
            '2020-2021',
            '2019-2020',
            '2018-2019',
             '2017-2018',
    
          ];

          const handleFacilityCodeChange = (e) => {
            const code = e.target.value;
            setSelectedFacilityCode(code);
            const index = facilityCodes.indexOf(code);
            setSelectedFacilityName(facilityNames[index]);
          };


          const handleFacilityNameChange = (e) => {
            const code = e.target.value;
            setSelectedFacilityName(code);
            const index = facilityNames.indexOf(code);
            setSelectedFacilityName(facilityNames[index]);
          };

          const MonthValue=['january','february','march','april','may','june','july','august','september','october','november','december']
          const handleYearChange = (event) => {
            setSelectedYear(event.target.value);
            // Add logic here to handle the selected year
          };
          const handleMonthChange = (event) => {
            setSelectedMonth(event.target.value);
            // Add logic here to handle the selected year
          };
        const addRow = () => {
            setRowCount((prevCount) => prevCount + 1); // Increment row count
          };
        
          const renderDynamicRows = () => {
            let rows = [
              <div className='row-bar' key={0}>
            <div className="data-row">
                {/* Define your row content here */}
                <input type="text" placeholder="Type of Vehicle" className="mobile-combustion-data-entry-child1-vehicle" />
                <input className="mobile-combustion-data-entry-child2-fuel" type="text" placeholder="Type of Fuel" />
                <input className="mobile-combustion-data-entry-child3-quantity" type="text" placeholder="Quantity" />
                <input className="mobile-combustion-data-entry-child4-si" type="text" placeholder="SI Units" />
                <input className="mobile-combustion-data-entry-child5-distance" type="text" placeholder="Distance in KM" />

                <div className='mobile-combustion-data-entry-child18-new'>
                    <img className="file-2-1-icon" alt="" src={UploadSvg} />
                    {/* Custom label for file input */}
                    <label htmlFor={`file-upload-input-0`} className="file-upload-input" style={{ width: '' }}>
                        Upload File
                    </label>
                    {/* Hidden file input */}
                    <input
                        id={`file-upload-input-0`}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        onClick={handleUpload}
                    />
                </div>
            </div>
        </div>,
        // Initial row 2
        <div className='row-bar' key={1}>
            <div className="data-row">
                {/* Define your row content here */}
                <input type="text" placeholder="Type of Vehicle" className="mobile-combustion-data-entry-child1-vehicle" />
                <input className="mobile-combustion-data-entry-child2-fuel" type="text" placeholder="Type of Fuel" />
                <input className="mobile-combustion-data-entry-child3-quantity" type="text" placeholder="Quantity" />
                <input className="mobile-combustion-data-entry-child4-si" type="text" placeholder="SI Units" />
                <input className="mobile-combustion-data-entry-child5-distance" type="text" placeholder="Distance in KM" />

                <div className='mobile-combustion-data-entry-child18-new'>
                    <img className="file-2-1-icon" alt="" src={UploadSvg} />
                    {/* Custom label for file input */}
                    <label htmlFor={`file-upload-input-1`} className="file-upload-input" style={{ width: '' }}>
                        Upload File
                    </label>
                    {/* Hidden file input */}
                    <input
                        id={`file-upload-input-1`}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        onClick={handleUpload}
                    />
                </div>
            </div>
        </div>
            ];
            for (let i = 0; i < rowCount; i++) {
              rows.push(
                <div className='row-bar'>
                <div key={i+2} className="data-row">
                  {/* Define your row content here */}
                  <input type="text" placeholder="Type of Vehicle" className="mobile-combustion-data-entry-child1-vehicle" />
                  <input className="mobile-combustion-data-entry-child2-fuel" type="text" placeholder="Type of Fuel"/>
                  <input className="mobile-combustion-data-entry-child3-quantity" type="text" placeholder="Quantity"/>
                  <input className="mobile-combustion-data-entry-child4-si" type="text" placeholder="SI Units"/>
                  <input className="mobile-combustion-data-entry-child5-distance" type="text" placeholder="Distance in KM"/>
                
                  <div className='mobile-combustion-data-entry-child18-new'>
                    <img className="file-2-1-icon" alt="" src={UploadSvg}/>
                      {/* Custom label for file input */}
                      <label htmlFor="file-upload-input" className="file-upload-input" style={{width:''}}>
                      
                      Upload File
                      </label>
                      {/* <img className="file-2-1-icon" alt="" src={UploadSvg}/> */}
                      {/* Hidden file input */}
                      <input
                        id="file-upload-input"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        onClick={handleUpload}
                      />
      
                   </div>


                </div>
                </div>
              );
            }
            return rows;
          };
        
        const handleFileChange = (e) => {
          setFile(e.target.files[0]); // Set selected file
        };
      
        const handleUpload = async () => {
          if (file) {
            try {
              const formData = new FormData();
              formData.append('file', file);
      
              const response = await axios.post('http://localhost:5000/upload', formData);
      
              if (response.status === 200) {
                console.log('File uploaded successfully!');
              }
            } catch (error) {
              console.error('Error uploading file:', error);
            }
          } else {
            console.error('No file selected.');
          }
        };

  return (
    <div className="mobile-combustion-data-entry">
      <div className="mobile-combustion-data-entry-child" />
      <img
        className="white-variation-11"
        alt=""
        src={whitevariationSvg}
      />
      <div className="mobile-combustion-data-entry-item" />
      <img className="user-5-11" alt="" src={User}/>
      <img
        className="data-management-1-icon1"
        alt=""
        src={GreenSvg}
      />
      <img
        className="data-management-4-icon1"
        alt=""
        src={PiechartSvg}
      />
      <img
        className="data-management-2-icon1"
        alt=""
        src={CircleSvg}
      />
      <div className="co2-group">
        <img className="co21" alt="" src={Co2} />
      </div>
      <div className="dropdown-box1">
        <div className="">
          <div className="menu-label2">
            <div className="menu-label3">
            <select
                             value={selectedYear}
                             onChange={handleYearChange}
                              className="year-dropdown header1"
                            >
                         <option value="">Reporting Year</option>
                            {yearRanges.map((year) => (
                                 <option key={year} value={year}>
                                       {year}
                         </option>
                        ))}
                        </select>
            </div>
          </div>
         
          
        </div>
      </div>
      <div className="reporting-year2">Reporting Year</div>
      <img
        className="data-management-3-icon1"
        alt=""
        src={FolderSvg}
      />
      <img
        className="left-arrow-in-circular-button-icon1"
        alt=""
        src={Leftarrow}
      />
      <div className="mobile-combustion-data-entry-inner" />
      {/* <div className="mobile-combustion-data-entry-child6" /> */}
      <div className="select-month">SI Units</div>
      <div className="mobile-combustion-data-entry-child6" />
      <div className="">
      <select
                             value={selectedMonth}
                             onChange={handleMonthChange}
                              className="month-dropdown mobile-combustion-data-entry-child6"
                            >
                         <option value="">{`Select Month `}</option>
                            {MonthValue.map((year) => (
                                 <option key={year} value={year}>
                                       {year}
                         </option>
                        ))}
                        </select></div>
      <div className="type-of-vehicle2">Type of Vehicle</div>
      
      {/* <input className="mobile-combustion-data-entry-child8" type="text" placeholder="    Facility Code"/>
      
      <input className="mobile-combustion-data-entry-child9" type="text" placeholder="    Facility Name"/> */}
      <select className="mobile-combustion-data-entry-child8" value={selectedFacilityCode} onChange={handleFacilityCodeChange}>
          <option value="">Facility Code</option>
          {facilityCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <select className="mobile-combustion-data-entry-child9" value={selectedFacilityName} onChange={handleFacilityNameChange}>
          <option value="">Facility Name</option>
          {facilityNames.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      <div className="facility1">{`Facility `}</div>
      <div className="fuel1">Fuel</div>
      <div className="quantity2">Quantity</div>
      <div className="si-units2">SI Units</div>
      <div className="distance">Distance</div>
      <div className="month1">Month</div>
      <div className="div16">750</div>
      <div className="mtco21">MTCO2</div>
      <img className="cart-12-icon1" alt="" src={Cart} />
      <b className="mobile-combustion1">MOBILE COMBUSTION</b>
     
      
      {/* <buton className="mobile-combustion-data-entry-child12" onClick={addRow}>
        <b className="add-data">ADD DATA</b>
        <img className="add-6-icon" alt="" src={AddIcon}/>
      </buton> */}

      <img className="vector-icon" alt="" src={Layer1}/>
      <img
        className="mobile-combustion-data-entry-child13"
        alt=""
        src={Layer2}
      />
      <img
        className="mobile-combustion-data-entry-child14"
        alt=""
        src={Layer3}
      />
      <div className="ellipse-div" />
      <div className="mobile-combustion-data-entry-child15" />
      <div className="mobile-combustion-data-entry-child16" />
      <div className="mobile-combustion-data-entry-child17" />
      <b className="view-data">VIEW DATA</b>
      <img className="add-8-icon" alt="" src={SearchSvg} />
      <div className="attachments">Attachments</div>
      <div className={`dynamic-rows-container ${rowCount > 0 ? 'scrollable' : ''}`}>
        <div>
          <div className="dynamic-rows">{renderDynamicRows()}</div>
        </div>
      </div>
      <buton className="mobile-combustion-data-entry-child12" onClick={addRow}>
        <img className="add-6-icon" alt="" src={AddIcon}/>
        <b className="add-data">ADD DATA</b>
      </buton>

    </div>
  );
};

export default DataEntry;
