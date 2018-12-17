import React, { Component } from 'react'
import styled from 'styled-components'
import { stringify } from 'qs'
import { color } from '../globalStyles'

class Form extends Component {
  state = {
    name: '',
    email: '',
    message: '',
    subject: `New Submission from ${this.props.siteTitle}!`,
    comments: '',
    disabled: false,
    alert: '',
    action: '/contact/',
    'form-name': 'Contact',
  }

  form = null

  componentDidMount() {
    Array.from(document.querySelectorAll('.Form .Input')).forEach(input => {
      input.addEventListener('invalid', () => {
        console.log(input)
        input.dataset.touched = true
      })
      input.addEventListener('blur', () => {
        if (input.value !== '') input.dataset.touched = true
      })
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
      subject: this.state.subject,
      comments: this.state.comments,
      'form-name': this.state['form-name'],
    }
    this.setState({ disabled: true })
    fetch(this.state.action + '?' + stringify(data), {
      method: 'POST',
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(res => {
        this.setState({
          disabled: false,
          alert: 'Thanks for your enquiry, we will get back to you soon.',
          name: '',
          email: '',
          message: '',
          subject: `New Submission from ${this.props.siteTitle}!`,
          comments: '',
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          disabled: false,
          alert:
            '❗️ There is a problem, your message has not been sent, please try contacting us via email',
        })
      })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    return (
      <StyledForm
        name={this.state['form-name']}
        ref={form => {
          this.form = form
        }}
        className="Form"
        action={this.state.action}
        onSubmit={this.handleSubmit}
        data-netlify=""
        data-netlify-honeypot="comments"
      >
        {this.state.alert && <Alert>{this.state.alert}</Alert>}
        <Label className="Label">
          <Input
            value={this.state.name}
            onChange={this.handleChange}
            className="Input"
            type="text"
            placeholder="Your Name"
            name="name"
            required
            disabled={this.state.disabled ? 'disabled' : ''}
          />
          <LineGroup />
        </Label>
        <Label className="Label">
          <Input
            value={this.state.email}
            onChange={this.handleChange}
            className="Input"
            type="email"
            placeholder="Your Email"
            name="email"
            required
            disabled={this.state.disabled ? 'disabled' : ''}
          />
          <LineGroup />
        </Label>
        <Label className="Label">
          <Textarea
            value={this.state.message}
            onChange={this.handleChange}
            className="Input"
            placeholder="Message"
            name="message"
            rows="10"
            required
            disabled={this.state.disabled ? 'disabled' : ''}
          />
          <LineGroup />
        </Label>
        <Input
          type="text"
          name="comments"
          style={{ display: 'none' }}
          value={this.state.comments}
          onChange={this.handleChange}
        />
        <Input type="hidden" name="subject" value={this.state.subject} />
        <Input type="hidden" name="form-name" value={this.state['form-name']} />
        <Button
          className="button"
          type="submit"
          value="Send"
          disabled={this.state.disabled ? 'disabled' : ''}
        />
        <div data-netlify-recaptcha />
      </StyledForm>
    )
  }
}

export default Form

const LineGroup = () => (
  <Line className="Line" viewBox="0 0 40 2" preserveAspectRatio="none">
    <path d="M0 1 L40 1" />
    <path d="M0 1 L40 1" className="focus" />
    <path d="M0 1 L40 1" className="invalid" />
    <path d="M0 1 L40 1" className="valid" />
  </Line>
)

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 500px;
  margin: 2.5rem 0;

  & > * + * {
    margin-top: 1.5rem;
  }
`
const Label = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
const Line = styled.svg`
  width: 100%;
  height: 1px;
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 2px;

  & .focus,
  & .valid,
  & .invalid {
    transition: all 0.2s;
    stroke-dasharray: 0, 20;
    stroke-dashoffset: -20;
  }

  & .focus {
    stroke: ${color.secondary};
  }

  & .valid {
    stroke: hsl(166, 72%, 40%);
  }

  & .invalid {
    stroke: tomato;
  }
`
const Input = styled.input`
  font-family: inherit;
  font-weight: inherit;
  flex-grow: 1;
  box-sizing: border-box;
  display: block;
  margin: 0;
  border: none;
  padding: 0.5em 0;
  line-height: 1;
  transition: border-color 0.2s;
  resize: none;
  background: transparent;
  color: inherit;

  &:focus {
    outline: none;
  }

  &:focus ~ ${Line} .focus,
  &:valid ~ ${Line} .valid,
  &[data-touched]:invalid ~ ${Line} .invalid {
    stroke-dasharray: 40, 0;
    stroke-dashoffset: 0;
  }

  &[disabled] {
    opacity: 0.4;
    pointer-events: none;
    cursor: progress;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`
const Textarea = Input.withComponent('textarea')
const Alert = styled.p`
  background: transparent;
  width: 100%;
  padding: 2rem;
  color: ${color.primary};
  border: 1px solid ${color.primary};
`
const Button = styled.input`
  background: ${color.secondary};
  color: ${color.black};
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 400;
  letter-spacing: 0.15em;
  font-size: 1.4rem;
  display: inline-block;
  padding: 1rem 2rem;
  border: 1px solid ${color.secondary};
  transition: all 0.1s ease;
  cursor: pointer;

  &:hover,
  &:focus {
    color: white;
    border: 1px solid currentColor;
    background: transparent;
  }

  &[disabled] {
    opacity: 0.4;
    pointer-events: none;
    cursor: progress;
  }
`
