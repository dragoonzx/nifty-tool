import { AccentText } from 'components/Text'
import { useSnapshot } from 'valtio'
import EnsAddress from 'components/EnsAddress'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  cursor,
  display,
  lineHeight,
  space,
  textAlign,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

const walletContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-4'),
  cursor('cursor-pointer')
)
const walletAccount = classnames(
  textAlign('text-right'),
  lineHeight('leading-5'),
  display('sm:flex', 'hidden')
)

export default function () {
  const { account } = useSnapshot(WalletStore)

  return (
    <div
      className={walletContainer}
      onClick={async () => {
        if (account) {
          window.open(getEtherscanAddressUrl(account), '_blank')?.focus()
        } else {
          await WalletStore.connect(true)
        }
      }}
    >
      <div className={walletAccount}>
        <AccentText
          color={account ? 'text-accent' : 'text-primary-semi-dimmed'}
        >
          {account ? <EnsAddress address={account} /> : 'No wallet connected'}
        </AccentText>
      </div>
    </div>
  )
}
