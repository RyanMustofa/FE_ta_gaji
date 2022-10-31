import { CloseSquare, PaperPlus } from "react-iconly";
import IntlMessages from "../../layout/components/lang/IntlMessages";

const pages = [
    {
        header: <IntlMessages id="sidebar-pages" />,
        subMenu: [
            {
                id: "blank-page",
                title: <IntlMessages id="sidebar-pages-blank-page" />,
                icon: <PaperPlus set="curved" className="remix-icon" />,
                navLink: "/pages/blank-page",
            },
            {
                id: "errors",
                title: <IntlMessages id="sidebar-pages-error" />,
                icon: <CloseSquare set="curved" className="remix-icon" />,
                children: [
                    {
                        id: "error-page",
                        title: "404",
                        navLink: "/pages/error-page",
                    },
                ],
            },
        ]
    }
];

export default pages