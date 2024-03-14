import React, {useEffect, ComponentType} from 'react';
import Dom from "../../utils/DOM";

const withDocumentTitle = <P extends object>(WrappedComponent: ComponentType<P>, title: string) => {
    const WithDocumentTitle: React.FC<P> = (props) => {
        useEffect(() => {
            Dom.setDocumentTitle(title);
        }, []);

        return <WrappedComponent {...props} />;
    };

    return WithDocumentTitle;
};

export default withDocumentTitle;
