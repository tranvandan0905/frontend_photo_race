import { Toast, ToastContainer } from 'react-bootstrap';

const AlertToast = ({ alert, setAlert }) => {
  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{
        position: 'fixed',    // 👈 đây là điểm quan trọng
        top: '1rem',
        right: '1rem',
        zIndex: 9999
      }}
    >
      <Toast
        bg={alert.variant === 'success' ? 'success' : 'danger'}
        onClose={() => setAlert({ ...alert, message: null })}
        show={!!alert.message}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {alert.variant === 'success' ? '✅ Thành công' : '❌ Lỗi'}
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          {alert.message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AlertToast;
