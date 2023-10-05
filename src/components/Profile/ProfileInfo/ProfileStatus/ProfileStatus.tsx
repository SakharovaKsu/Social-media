import React, {ChangeEvent, Component} from 'react';

type ProfileStatusType = {
    status: string
    updateStatusTC: (status: string) => void
}

type ProfileStatusState = {
    editMode: boolean
    status: string
}

class ProfileStatus extends Component<ProfileStatusType, ProfileStatusState> {
    constructor(props: ProfileStatusType) {
        super(props);
        this.state = {
            editMode: false,
            status: this.props.status
        }
    }

    state = {
        editMode: false,
        status: this.props.status
    }

    componentDidUpdate(prevProps: ProfileStatusType) {
        // условие обязательно делать, что б не было зацикленности при рендере
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateStatusTC(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || 'No status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
                    </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;