import React from "react";
import Asset from "./Asset";

const AssetsData = [
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    name: "ERC20",
    tokenValue: "23.32 TOKEN",
    amount: "2121.23",
    upDownValue: "+11(2121.23)",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    name: "NFT",
    tokenValue: "23.32 TOKEN",
    amount: "2121.23",
    upDownValue: "-11(2121.23)",
  },
  {
    image: "https://mdbootstrap.com/img/new/standard/city/047.jpg",
    name: "ETH",
    tokenValue: "23.32 TOKEN",
    amount: "2121.23",
    upDownValue: "+11(2121.23)",
  },
];

const Treasury = () => {
  const { address } = useAccount();
  const [treasuryContract, setTreasury] = useState();
  const [tokenContract, setToken] = useState();
  const [balance, setBalance] = useState();
  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [ethBalance, setEthBalance] = useState();

  const init = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = await provider.getSigner();
    let treasury = new ethers.Contract(
      contractAddress.NFTDeposit,
      treasuryABI,
      signer
    );
    let token = new ethers.Contract(
      contractAddress.TokenAddress,
      erc20ABI,
      signer
    );
    let TokenBalance = await token.balanceOf(contractAddress.NFTDeposit);
    let TokenName = await token.name();
    let TokenSymbol = await token.symbol();
    let etherBal = await provider.getBalance(contractAddress.NFTDeposit);
    setTreasury(treasury);
    setToken(token);
    setTokenName(TokenName);
    setTokenSymbol(TokenSymbol);
    setBalance(ethers.utils.formatEther(TokenBalance));
    setEthBalance(ethers.utils.formatEther(etherBal));
  };

  const depositTokenToTreasury = async (amount) => {
    let allowance = await tokenContract.allowance(
      address,
      contractAddress.NFTDeposit
    );
    if (ethers.utils.formatEther(allowance) == 0) {
      let approveTx = await tokenContract.approve(
        contractAddress.NFTDeposit,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      );
      let depositTx = await treasuryContract.depositToken(amount);
    } else {
      let depositTx = await treasuryContract.depositToken(amount);
    }
  };

  const depositEth = async () => {
    let depositTx = await treasuryContract.depositEth("100000000000000000", {
      value: ethers.utils.parseEther("0.1"),
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div>
        <div className="mx-auto mt-5 font-bold max-w-2xl text-3xl text-gray-50">
          <h1>Treasury</h1>
        </div>
        <div>
          <ul
            className="mx-auto max-w-2xl my-5 text-lg font-medium   rounded-lg border   border-gray-600 text-white"
            style={{ borderColor: "#2d2d2d" }}
          >
            <li
              className="py-2 px-4 w-full rounded-t-lg border-b  border-gray-600"
              style={{ borderColor: "#2d2d2d" }}
            >
              Assets
            </li>
            {AssetsData.map((data, index) => (
              <Asset data={data} key={index} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Treasury;
