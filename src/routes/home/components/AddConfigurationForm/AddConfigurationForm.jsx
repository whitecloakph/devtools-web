import React from 'react'
import { Form, Input } from 'antd'

class AddConfigurationForm extends React.Component {
  constructor() {
    super()
    this.state = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    }
  }

  render() {
    const { form } = this.props
    const { labelCol, wrapperCol } = this.state

    return (
      <Form>
        <Form.Item
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          label="Name"
        >
          {
            form.getFieldDecorator(
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: 'Name is required',
                  },
                ],
              },
            )(
              <Input
                placeholder="Name"
              />,
            )
          }
        </Form.Item>
        <Form.Item
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          label="API Key"
        >
          {
            form.getFieldDecorator(
              'apiKey',
              {
                rules: [
                  {
                    required: true,
                    message: 'API Key is required',
                  },
                ],
              },
            )(
              <Input
                placeholder="API Key"
              />,
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(AddConfigurationForm)
