import { Enum, Method } from 'vue-cdk/utils';
import { ElSize } from '../types';
import { computed, defineComponent, ref, renderSlot } from 'vue';

export default defineComponent({
  name: 'po-avatar',
  props: {
    size: {
      type: [Number, Enum<ElSize>()],
      default: 'medium',
    },
    shape: {
      type: Enum<'circle' | 'square'>(),
      default: 'circle',
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    // when image load failed
    onError: {
      type: Method<(e: Event) => boolean>(),
      default: () => { },
    },
    fit: {
      type: Enum<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>(),
      default: 'cover',
    },
  },
  setup(props, ctx) {
    const isImageExist = ref(true);
    // witch class to use uppon avatar component
    const avatarClass = computed(() => {
      const classList = ['el-avatar'];
      if (props.size && typeof props.size === 'string') {
        classList.push(`el-avatar--${props.size}`);
      }
      if (props.icon) {
        classList.push('el-avatar--icon');
      }
      if (props.shape) {
        classList.push(`el-avatar--${props.shape}`);
      }
      return classList.join(' ');
    });

    // size style if size is number
    const sizeStyle = computed(() =>
      typeof props.size === 'number'
        ? {
          height: `${props.size}px`,
          width: `${props.size}px`,
          lineHeight: `${props.size}px`,
        }
        : {}
    );

    // load error handler
    const handleError = (e: Event) => {
      const result = props.onError?.(e);
      if (result !== false) {
        isImageExist.value = false;
      }
    };

    // render avatar element
    const renderAvatar = () => {
      if (isImageExist.value && props.src) {
        return (
          <img
            src={props.src}
            onError={handleError}
            alt={props.alt}
            srcset={props.srcSet}
            style={{ 'object-fit': props.fit } as any}
          />
        );
      }
      if (props.icon) {
        return <i class={props.icon} />;
      }
      return renderSlot(ctx.slots, 'default');
    };

    return () => (
      <span class={avatarClass.value} style={sizeStyle.value}>
        {renderAvatar()}
      </span>
    );
  },
});
