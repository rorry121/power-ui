import { Ref, computed, defineComponent, renderList } from 'vue';
import { Message } from './message';
import { MessageData } from './types';
import { Overlay } from 'vue-cdk/overlay';

export const MessageContainerFactory = (datas: Ref<Required<MessageData>[]>, destroy: (id: string) => void) => defineComponent({
  setup() {
    const visible = computed(() => {
      return datas.value.length > 0;
    });

    return () => {
      return (
        <Overlay
          v-model={[visible.value, 'visible']}
          hasBackdrop={false}
        >
          <div class="el-message-container">
            {renderList(datas.value, (value) => {
              <Message
                key={value.messageId}
                id={value.messageId}
                type={value.type}
                iconClass={value.iconClass}
                content={value.content}
                onDestroy={destroy}
              ></Message>;
            })}
          </div>
        </Overlay>
      );
    };
  }
});

export type MessageContainer = ReturnType<typeof MessageContainerFactory>;