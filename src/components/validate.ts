export type ValidateFn = (value: string | number) => string[]

export function required(): ValidateFn {
  return (value) => {
    switch (typeof value) {
      case 'object':
        return value === null ? ['Required field'] : []
      case 'string':
        return !value.trim() ? ['Required field'] : []
      case 'number':
        return []
      case 'undefined':
        return ['Required field']
    }
  }
}

export function validate(...validators: ValidateFn[]): ValidateFn {
  return (value) => {
    const errors: string[] = []
    validators.forEach((validator) => errors.push(...validator(value)))
    return errors
  }
}

export function hasErrors(...errors: string[][]) {
  return errors.some((err) => err.length > 0)
}

export function isValid(...errors: string[][]) {
  return !hasErrors(...errors)
}
