
import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Error desconocido';
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-fp-red">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="mt-4 text-lg">Ha ocurrido un error inesperado.</p>
      <p className="mt-2">
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
