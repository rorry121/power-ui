import { inject, InjectionKey, provide, ref } from 'vue';
import { MessageContainer, MessageContainerFactory } from './message-container';
import { MessageData, MessageDataOptions } from './types';

let _$counter = 0;

export abstract class MessageService {

  info(content: string, options?: MessageDataOptions): void {
    this.create({ type: 'info', content, options });
  }

  error(content: string, options?: MessageDataOptions): void {
    this.create({ type: 'error', content, options });
  }

  warning(content: string, options?: MessageDataOptions): void {
    this.create({ type: 'warning', content, options });
  }

  abstract closeAll(): void;

  protected getInstanceId(): string {
    return `eleMessage-${++_$counter}`;
  }

  protected abstract create(data: MessageData): void;
}

class MessageServiceImpl extends MessageService {
  private instances = ref<Required<MessageData>[]>([]);
  readonly container: MessageContainer;

  constructor(key: InjectionKey<MessageService>) {
    super();
    this.container = this.render();
    provide(key, this);
  }

  protected create(data: MessageData) {
    const messageData = {
      type: data.type || 'info',
      iconClass: data.iconClass ?? '',
      options: {},
      content: data.content ?? '',
      messageId: this.getInstanceId(),
      createdAt: new Date()
    };
    this.instances.value.push(messageData);

    // trigger change
    this.instances.value = this.instances.value;
  }

  closeAll(): void {
    this.instances.value = [];
  }

  destroy(id: string) {
    const instances = this.instances.value;
    this.instances.value = instances.filter((value) => value.messageId !== id);
  }

  render() {
    return MessageContainerFactory(this.instances, this.destroy.bind(this));
  }
}


const $message = Symbol() as InjectionKey<MessageService>;

export const useMessage = () => inject($message)!;
export const provideMessage = () => new MessageServiceImpl($message);
