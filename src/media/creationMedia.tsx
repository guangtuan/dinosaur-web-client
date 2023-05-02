import { Modal, Form, Input } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";

const CreationMedia = () => {
    return <Modal
        visible={true}
    >
        <Form>
            <Input placeholder="name"></Input>
        </Form>
    </Modal>
}

export default CreationMedia;