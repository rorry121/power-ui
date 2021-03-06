import { defineComponent, ref, shallowRef } from 'vue';
import {
  Alert,
  Avatar,
  Backtop,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  Dialog,
  Drawer,
  Input,
  Popconfirm,
  Popover,
  Progress,
  Select,
  SelectOption,
  Slider,
  Step,
  Steps,
  Switch,
  Tag,
  Tooltip,
  Upload,
  vPopconfirm,
  vPopover,
  vTooltip,
  Rate,
  useMessage,
  useNotification
} from 'power-ui';
import CDKTest from 'vue-cdk/Test';
import { Layout } from './layout';



export default defineComponent({
  name: 'home',
  directives: {
    'popover': vPopover,
    'tooltip': vTooltip,
    'popconfirm': vPopconfirm,
  },
  setup() {
    const message = useMessage();
    const notification = useNotification();
    const divRef = ref<HTMLDivElement | null>(null);
    const showModal = ref(false);
    const stepActiveRef = ref(0);
    const popoverProps = {
      title: '标题',
      content: '这是一条内容',
      placement: 'top-end',
    } as const;
    const switchValue = ref(false);

    const showDrawer = ref(false);

    const input = ref('');

    const selectValue = ref('');

    const dateRef = shallowRef(new Date());

    return () => (
      <Layout>
        <div>
          <Backtop />
          <Badge value='快点我'>
            <Button
              type='primary'
            >
              click me
            </Button>
          </Badge>
          <Alert
            v-slots={{ title: () => 'sdfsdfdsf' }}
            showIcon={true}
            type='error'
            onClose={() => {
              console.log('closed');
            }}
          >
            this is test
          </Alert>
          <Avatar
            size='large'
            src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          ></Avatar>
          <Avatar
            size='medium'
            src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          ></Avatar>
          <Avatar
            size='small'
            src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          ></Avatar>
          <Button type='danger' onClick={() => message.info('hello')}>
            打开消息
          </Button>
          <div>
            <Breadcrumb
              onSelected={(e: string) => {
                console.log(e);
              }}
            >
              <BreadcrumbItem value='123'>test</BreadcrumbItem>
              <BreadcrumbItem value='234'>test</BreadcrumbItem>
              <BreadcrumbItem value='345'>test</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <p id="button">
            <Button type='primary'>test</Button>
            <Button icon='el-icon-search' circle></Button>
            <Button type='primary' icon='el-icon-edit' circle></Button>
            <Button type='success' icon='el-icon-check' circle></Button>
            <Button type='info' icon='el-icon-message' circle></Button>
            <Button type='warning' icon='el-icon-star-off' circle></Button>
            <Button type='danger' icon='el-icon-delete' circle></Button>
          </p>
          <p>
            <ButtonGroup>
              <Button type='primary' icon='el-icon-arrow-left'>
                上一页
              </Button>
              <Button type='primary'>
                下一页<i class='el-icon-arrow-right el-icon--right'></i>
              </Button>
            </ButtonGroup>
          </p>
          <p>
            <Calendar v-model={dateRef.value} />
          </p>

          {/* dialog */}
          <p>
            <Button onClick={() => showModal.value = true}>show Dialog</Button>
            <Dialog
              id="fuck"
              title="提示"
              width="30%"
              v-model={[showModal.value, 'visible']}
              v-slots={{
                footer: () => (
                  <span class="dialog-footer">
                    <Button onClick={() => showModal.value = false}>取 消</Button>
                    <Button type="primary" onClick={() => {
                      showModal.value = false;
                    }}>确 定</Button>
                  </span>
                ),
              }}
            >
              <div>测试内容</div>
            </Dialog>
          </p>

          {/* popover */}
          <p>
            <Popover {...popoverProps}>
              <Button ref="button">click popover1</Button>
            </Popover>

            <Popover ref="popover" {...popoverProps} />
            <Button v-popover="popover">click popover2</Button>

            <Popover ref="popover_ts" title="标题" placement="top-start" trigger="hover" content="这是一条内容" />
            <Button v-popover="popover_ts">hover</Button>
          </p>

          <p>
            <Popconfirm ref="popconfirm" title="test content" />
            <Button v-popconfirm="popconfirm">click</Button>
          </p>

          {/* tooltips */}
          <p>
            <Tooltip
              ref="tooltip"
              content="这是一条测试内容！"
            >tooltips!!!!</Tooltip>

            <div v-tooltip="tooltip" style={{ width: '100px', border: '1px solid black' }}>test</div>
            <Tooltip
              ref="tooltip"
              trigger="click"
              v-slots={{ content: () => (<div>test content</div>) }}
            />
          </p>

          <p>
            <Tag size="medium">标签一</Tag>
            <Tag size="small">标签二</Tag>
            <Tag size="mini">标签三</Tag>
            <Tag type="success">标签四</Tag>
            <Tag type="info">标签五</Tag>
            <Tag type="danger">标签六</Tag>
            <Tag type="warning">标签七</Tag>
          </p>

          {/* notification */}
          <p>
            <Button onClick={() => notification.notify({
              type: 'info',
              title: '标题',
              message: '信息信息信息'
            })}>show notification tr</Button>
            <Button onClick={() => notification.notify({
              type: 'info',
              title: '标题',
              message: '信息信息信息',
              position: 'top-left'
            })}>show notification tl</Button>
            <Button onClick={() => notification.notify({
              type: 'info',
              title: '标题',
              message: '信息信息信息',
              position: 'bottom-right',
            })}>show notification br</Button>
            <Button onClick={() => notification.notify({
              type: 'info',
              title: '标题',
              message: '信息信息信息',
              position: 'bottom-left',
              duration: 0,
              showClose: true
            })}>show notification bl</Button>
          </p>

          <p>
            <div style="width: 20%">
              <Progress />
              <Progress percentage={20} />

            </div>
          </p>
          <p>
            <Upload action="" >
              <Button>测试</Button>
            </Upload>
          </p>
          <p>
            <Switch
              v-model={switchValue.value}
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </p>
          <p style="width: 400px;">
            <Steps space="200px" active={1} finishStatus="success">
              <Step title="已完成"></Step>
              <Step title="进行中"></Step>
              <Step title="步骤 3"></Step>
            </Steps>
            <Steps active={stepActiveRef.value} finishStatus="success">
              <Step title="步骤 1"></Step>
              <Step title="步骤 2"></Step>
              <Step title="步骤 3"></Step>
            </Steps>
            <Button onClick={() => {
              if (stepActiveRef.value++ > 2) stepActiveRef.value = 0;
            }}>next</Button>

            <Steps active={2} alignCenter>
              <Step title="步骤1" description="这是一段很长很长很长的描述性文字"></Step>
              <Step title="步骤2" description="这是一段很长很长很长的描述性文字"></Step>
              <Step title="步骤3" description="这是一段很长很长很长的描述性文字"></Step>
              <Step title="步骤4" description="这是一段很长很长很长的描述性文字"></Step>
            </Steps>

            <Steps active={1} simple>
              <Step title="步骤 1" icon="el-icon-edit"></Step>
              <Step title="步骤 2" icon="el-icon-upload"></Step>
              <Step title="步骤 3" icon="el-icon-picture"></Step>
            </Steps>
          </p>
          <p style="margin-top:20px">
            {/* <p style="margin-top:20px">
              <RadioGroup v-model={radioRef.value}>
                <Radio label="上海"></Radio>
                <Radio label="北京"></Radio>
                <Radio label="广州"></Radio>
                <Radio label="深圳"></Radio>
              </RadioGroup>
            </p>
            <p style="margin-top:20px">
              <RadioGroup v-model={radioRef.value}>
                <RadioButton label="上海"></RadioButton>
                <RadioButton label="北京"></RadioButton>
                <RadioButton label="广州"></RadioButton>
                <RadioButton label="深圳"></RadioButton>
              </RadioGroup>
            </p>
            <p style="margin-top:20px">
              <RadioGroup v-model={radioRef.value} disabled={true} size="small">
                <RadioButton label="上海"></RadioButton>
                <RadioButton label="北京"></RadioButton>
                <RadioButton label="广州"></RadioButton>
                <RadioButton label="深圳"></RadioButton>
              </RadioGroup>
            </p> */}
          </p>

          <p>
            <Button onClick={() => showDrawer.value = true}>show drawer</Button>
            <Drawer v-model={[showDrawer.value, 'visible']}></Drawer>
          </p>

          <p>
            <Input v-model={input.value} placeholder="不能输入空格" onInput={(e: Event) => {
              input.value = (e.target as HTMLInputElement).value.replace(/\s*/g, '');
            }} />
            <Input v-model={input.value} placeholder="请输入内容2" clearable />
            <Input v-model={input.value} placeholder="请输入内容2" type="textarea" autosize />
          </p>

          <p style="width: 256px">
            {/* <Card bodyStyle={{ padding: '0px', }}>
            <img 
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" 
              style={{
                width: '100%',
                display: 'block'
              }} 
            />
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{new Date()}</time>
                <Button type="text" class="button">操作按钮</Button>
              </div>
            </div>
          </Card> */}
          </p>
          <p>
            <Select v-model={selectValue.value}>
              <SelectOption value="1" label="test1" />
              <SelectOption value="2" label="test2" />
              <SelectOption value="3" label="test3" />
              <SelectOption value="4" label="test4" />
              <SelectOption value="5" label="test5" />
            </Select>
          </p>
          <p>
            <Slider
              style={{ marginLeft: '20px', width: '600px' }}
              max={20}
              min={10}
            />
          </p>
          <p>
            <Rate></Rate>
          </p>
          <p>
            <CDKTest />
          </p>
          <div style='height:200px;overflow-y:auto'>
            <div ref={divRef} style='height:1000px'></div>
          </div>
          <div style='height:3000px'></div>
        </div>
      </Layout>
    );
  },
});
