import focus from '@/app/(examples)/v1/example/delivery/icons/mono_center_focus_strong.svg';
import done from '@/app/(examples)/v1/example/delivery/icons/mono_download_done.svg';
import check from '@/app/(examples)/v1/example/delivery/icons/mono_fact_check.svg';
import add from '@/app/(examples)/v1/example/delivery/icons/mono_playlist_add.svg';
import deliver from '@/app/(examples)/v1/example/delivery/icons/mono_view_in_ar.svg';

export const deliveryTranslations = {
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PURCHASE_ORDER_ITEM': {
    title: 'Order Item',
    value: 'You are ordering {1} for {2} KDA',
    image: add.src,
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.SELL_ORDER_ITEM': {
    title: 'Sell Item',
    value: 'You are preparing {1} for {2} KDA',
    image: add.src,
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.SET_READY_FOR_DELIVERY':
    {
      title: 'Ready for delivery',
      value:
        'Let the customer and couriers know the order is ready for delivery',
      image: check.src,
    },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.HANDOFF_DELIVERY': {
    title: 'Handoff',
    value: 'You are handing off the package to the courier',
    image: focus.src,
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.PICKUP_DELIVERY': {
    title: 'Pick up delivery',
    value: 'You are picking up the package',
    image: focus.src,
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.DELIVER_ORDER': {
    title: 'Delivering order',
    value: 'You are handing off the order to the customer',
    image: deliver.src,
  },
  'n_eef68e581f767dd66c4d4c39ed922be944ede505.delivery.RECEIVE_ORDER': {
    title: 'Recieving order',
    value: 'You are receiving the order from the courier',
    image: done.src,
  },
};
