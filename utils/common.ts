export const getErrorMessage = (error: any): string => {
  let message = "Something went wrong. Please try again later.";
  if (error.data) {
    if (error.data.message) {
      message = error.data.message;
    }
    if (typeof error.data === "string") {
      message = error.data;
    }
  }
  if (error.status === 400) {
    message = "Bad Request";
  }

  if (error.status === 401) {
    message = "Unauthorized";
  }

  return message;
};

export const DocumentType = {
  ACCOUNTANT_AND_CA: 'Accountant & CA',
  NEW_BUSINESS_OPPORTUNITIES: 'New Business Opportunities',
  AUTO_NEWS: 'Auto News'
};