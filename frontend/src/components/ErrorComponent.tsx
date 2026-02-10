import {Alert} from '@mantine/core';
import {IconInfoCircle} from '@tabler/icons-react';
import type {ApiError, ApiResponseError} from "../types/ApiResponse.ts";

interface Props {
  error?: ApiResponseError,
  clearError: () => void
}

export function ErrorComponent(props: Props) {
  const {error, clearError} = props;

  if (!error) {
    return null;
  }

  const renderError = (error: ApiError) => {
    switch (error.kind) {
      case "GENERAL":
      case "NOT_FOUND":
        return error.message;
      case "VALIDATION":
        if (error.errors.length === 0) {
          return "Validation error!"
        }
        if (error.errors.length === 1) {
          return `${error.errors[0].field}: ${error.errors[0].message}`
        }
        return <ul>
          {error.errors.map(validationError => {
            return <li key={validationError.field}>{`${validationError.field}: ${validationError.message}`}</li>
          })}
        </ul>
    }
  }

  return <Alert
      variant="light"
      color="red"
      icon={<IconInfoCircle />}
      withCloseButton
      onClose={clearError}
      mb="md"
    >
      {renderError(error.error)}
    </Alert>;
}