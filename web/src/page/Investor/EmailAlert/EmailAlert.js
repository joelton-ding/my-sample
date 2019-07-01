import React from 'react';
import { observer } from 'mobx-react'
import { Select, Input, Button } from 'antd'
import EmailListStore from '../../../store/EmailListStore'

const Option = Select.Option
//Select
function handleChange(value) {
  console.log(`selected ${value}`);
}

const EmailAlert = () => {
  let { state: { countryData, professionData, jobData, industryData }} = EmailListStore
  console.log('EmailListStore >>>>>', JSON.parse(JSON.stringify(EmailListStore)))
  console.log('professionData >>>>>', JSON.parse(JSON.stringify(professionData)))

  let countryOption = null
  let professionOption = null
  let jobOption = null
  let industryOption = null
  
  if(countryData && countryData.length > 0){
    countryOption = countryData.map((item, index) => {
      return (
        <Option key={index} value={item.label}>{item.label}</Option>
      )
    })
  }
  if(professionData && professionData.length > 0){
    professionOption = professionData.map((item, index) => {
      return(
        <Option key={index}>{item.label}</Option>
      )
    })
  }
  if(jobData && jobData.length > 0){
    jobOption = jobData.map((item, index) => {
      return (
        <Option key={index} value={item.label}>{item.label}</Option>
      )
    })
  }
  if(industryData && industryData.length > 0){
    industryOption = industryData.map((item, index) => {
      return(
        <Option key={index} value={item.label}>{item.label}</Option>
      )
    })
  }
  return (
    <div className="content">
      <p>Please fill up your details below to receive email alerts.</p>
      <table className="table-add-email">
        <tbody>
        <tr>
            <td>Email Address:</td>
            <td>
              <Input placeholder="Example: abc@gmail.com" />
            </td>
          </tr>
          <tr>
            <td>Country:</td>
            <td>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select Country"
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
              { countryOption }
              </Select>  
            </td>
          </tr>
          <tr>
            <td>Profession:</td>
            <td>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select Profession"
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
              { professionOption }
              </Select>  
            </td>
          </tr>
          <tr>
          <td>Job Position:</td>
            <td>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select Profession"
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                { jobOption }
              </Select> 
            </td>
          </tr>
          <tr>
            <td>Industry:</td>
            <td>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select Industry"
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
              { industryOption } 
              </Select>  
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
          <td>&nbsp;</td>
            <td>
              <Button type="primary">
                Save
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default observer(EmailAlert)