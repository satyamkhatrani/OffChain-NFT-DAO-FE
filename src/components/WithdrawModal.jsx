const WithdrawModal = (props) => {
  const { setShowModal, voteFor, proposalHash } = props;
  
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5  border-gray-300 rounded-t self-center">
            <span className="text-xl text-white">Vote Overview</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
